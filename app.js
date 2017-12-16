var express = require('express');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config/index");
var path = require("path");

//connect to mongodb
mongoose.connect(config.dbURI,{useMongoClient:true})
.then(function(){console.log('mongodb connected....')})
.catch(function(err){console.log(err)});
mongoose.Promise = global.Promise;

//

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname ,'public')));
app.use(express.static(path.join(__dirname ,'views')));

//routes 
app.get('/',function(req,res){
    res.sendFile('index.html');
})

var api = require("./routes/index");
app.use('/api/todos',api.todoRoutes);


//listen on port 8080
app.set("PORT",process.env.PORT || 3001);

var listener = app.listen(app.get("PORT"),function(){
    console.log('app starts listening at ' + listener.address().port)
});

