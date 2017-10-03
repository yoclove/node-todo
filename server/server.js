var express = require('express');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
var _ = require('lodash');
var mongoose = require('./db/mongoose').mongoose;
var Todo = require('./modules/todo').Todo;
var User = require('./modules/user').User;

var authenticate = require('./middleware/authenticate').authenticate;


var app = express();
app.use(bodyParser.json());


app.post('/todos',authenticate, function(req, res){
	var newTodo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});
	newTodo.save().then(function(doc){
		res.send(doc);
	}, function(err){
		res.status(400).send(err);
	});
});

app.get('/todos', authenticate, function(req, res){
	Todo.find({
		_creator: req.user._id
	}).then(function(todos){
		res.send({
			todos: todos,
			otherInfo: '其他信息'
		})
	}, function(err){
		res.status(400).send('err');
	})
});


app.get('/todos/:id', authenticate, function(req, res){
	var id = req.params.id;
	if( !ObjectId.isValid(id) ){
		return res.status(404).send();
	}
	
	Todo.findOne({
		_id: id,
		_creator: req.user._id
	}).then(function(todo){
		if(!todo){
			return res.status(400).send();
		}
		res.send({
			todo: todo
		});
	}).catch(function(err){
		res.status(404).send();
	})
	
});


app.delete('/todos/:id',authenticate, function(req, res){
	var id = req.params.id;
	if( !ObjectId.isValid(id) ){
		return res.status(404).send();
	}
	
	// Todo.findOneAndRmove({})  可以传多个参数
	// Todo.findByIdAndRmove('') id只能传一个id参数
	
	Todo.findOneAndRemove({_id: id,_creator: req.user._id}).then(function(todo){
		if(!todo){
			return res.status(400).send();
		}
		res.send({
			todo: todo
		});
	}).catch(function(err){
		res.status(404).send();
	})
	
});

app.patch('/todos/:id',authenticate, function(req, res){
	var id = req.params.id;
	if( !ObjectId.isValid(id) ){
		return res.status(404).send('id 错误');
	}
	
	var body = _.pick(req.body, ['text','completed']);
	
	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	
	Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then(function(todo){
		if(!todo){
			return res.status(404).send('没有找到');
		}
		
		res.send({
			todo: todo
		});
	}, function(err){
		res.status(400).send(err);
	})
	
});




app.post('/users',function(req, res){
	
	var body = _.pick(req.body, ['email','password']);
	console.log(body);
	var user = new User(body);
	
	
	user.save().then(function(){
		return user.generateAuthToken(); //返回promise 可以chain
		// res.send(doc);
	}).then(function(token){
		
		res.header('x-auth', token).send(user);	//返回token
		
	}).catch(function(e){
		res.status(400).send(e);
	})
});



app.get('/users/me',authenticate, function(req, res){
	res.send(req.user);
});

app.post('/users/login', function(req, res){
	var body = _.pick(req.body, ['email', 'password'])
	// res.send(body);
	User.findByCredentials(body.email, body.password).then(function(user){
		return user.generateAuthToken().then(function(token){
			res.header('x-auth', token).send(user);
		})
	}).catch(function(err){
		res.status(400).send(err);
	})
});


app.delete('/users/me/token', authenticate, function(req, res){
	req.user.removeToken(req.token).then(function(){
		res.status(200).send();
	},function(){
		res.status(400).send();
	})
});




app.listen('3000', function(){
	console.log('正在监听3000端口');
})

