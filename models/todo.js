var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    create_at:{
        type:Date,
        default:Date.now
    }
})

var Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;