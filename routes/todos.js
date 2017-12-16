var express = require("express");
var router = express.Router();
var helpers = require("../helpers/todos");

require('../models/index').Todo;

var mongoose = require("mongoose");
var Todo = mongoose.model('Todo');

router.route('/')
.get(helpers.getTodos)
.post(helpers.createTodos);

router.route('/:id')
.get(helpers.getTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo);
// router.get('/',function(req,res){
//     Todo.find({})
//     .then(function(todos){
//         res.json(todos);
//     })
//     .catch(function(err){res.send(err)})
// })

// router.post('/',function(req,res){
//     var newTodo = {
//         name: req.body.name
//     };
//     new Todo(newTodo)
//     .save()
//     .then(function(todo){
//         res.status(201).json(todo)
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// })

// router.get('/:id',function(req,res){
//     var query = {_id:req.params.id};
//     Todo.findOne(query)
//     .then(function(foundTodo){
//         res.json(foundTodo)
//     })
//     .catch(function(err){
//         res.send(err)
//     });
// })

// router.put('/:id',function(req,res) {   
//     var query = {_id: req.params.id};
//     Todo.findOne(query)
//     .then(function(updateTodo){
//         updateTodo.name = req.body.name;
//         updateTodo.completed = req.body.completed;
//         updateTodo.save()
//         .then(function(todo){
//          res.status(201).json(todo);
//         });
//     })
//     .catch(function(err){res.send(err)});
// })

// router.delete('/:id',function(req,res){
//     var query = {_id:req.params.id};
//     Todo.remove(query)
//     .then(function(){
//         res.json({"message":"we delete it"})
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// })

module.exports = router;