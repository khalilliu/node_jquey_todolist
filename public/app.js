
$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos);
    $('#todoInput').on('keypress',function(ev){
        if(ev.which==13){
            createTodo(ev)
        }
    })
    
    $('.list').delegate('li','click',function(ev){
        ev.stopPropagation();
        toggleTodo($(this));
    })
    
    $('.list').delegate('span','click',function(ev){
        ev.stopPropagation();
        removeTodo($(this).parent());
    })
})

function toggleTodo(todo){
    var clickID = todo.data('id');
    var isCompleted = !todo.data('completed');
    var updateURI = '/api/todos/'+clickID;
    var name = todo.data("name");
    var data = {completed: isCompleted,name:name};
    $.ajax({
        method:'PUT',
        url: updateURI,
        data: data
    })
    .then(function(){
        todo.toggleClass('done');
        todo.data("completed",isCompleted)
    })
}

function removeTodo(removeTodo){
    
    var clickID = removeTodo.data('id');
        var deleteURI = "/api/todos/"+clickID;
        $.ajax({
            method:"DELETE",
            url: deleteURI
        })
        .then(function(data){
            removeTodo.remove();
         })
        .catch(function(err){
            console.log(err);
        })
}

function addTodos(todos){
    todos.forEach(function(todo){
       addTodo(todo);
    })
}

function addTodo(todo){
    var newTodo = $('<li class="task">'+todo.name+'<span>X</span></li>');
    newTodo.data('id',todo._id);
    newTodo.data('completed',todo.completed);
    newTodo.data('name',todo.name);
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo(ev){
    var inputValue = $(ev.target).val();
    $.post('/api/todos',{name:inputValue})
    .then(function(newTodo){
       addTodo(newTodo);
       $(ev.target).val('')
    })
    .catch(function(err){
        console.log(err);
    })
}