var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose').mongoose;
var Todo = require('./modules/todo').Todo;
var User = require('./modules/user').User;


var app = express();
app.use(bodyParser.json());


app.post('/todos',function(req, res){
	console.log(req.body);
	var newTodo = new Todo({
		text: req.body.text
	});
	newTodo.save().then(function(doc){
		res.send(doc);
	}, function(err){
		res.status(400).send(err);
	});
});

app.get('/todos', function(req, res){
	Todo.find().then(function(todos){
		res.send({
			todos: todos,
			otherInfo: '其他信息'
		})
	}, function(err){
		res.status(400).send('err');
	})
});

app.listen('3000', function(){
	console.log('正在监听3000端口');
})

