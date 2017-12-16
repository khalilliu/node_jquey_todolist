var db = require("../models/index");

exports.getTodos = function (req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos)
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createTodos = function(req,res){
    db.Todo.create(req.body)
    .then(function(todo){
        res.json(todo)
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.getTodo = function(req,res){
    var query = {_id:req.params.id};
    db.Todo.findOne(query)
    .then(function(foundTodo){
        res.json(foundTodo)
    })
    .catch(function(err){
        res.send(err)
    });
}

exports.updateTodo = function(req,res) {   
    var query = {_id: req.params.id};
    db.Todo.findOne(query)
    .then(function(updateTodo){
        updateTodo.name = req.body.name;
        updateTodo.completed = req.body.completed;
        updateTodo.save()
        .then(function(todo){
         res.status(201).json(todo);
        });
    })
    .catch(function(err){res.send(err)});
}

exports.deleteTodo = function(req,res){
    var query = {_id:req.params.id};
    db.Todo.remove(query)
    .then(function(){
        res.json({"message":"we delete it"})
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;

