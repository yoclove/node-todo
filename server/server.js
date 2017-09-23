var express = require('express');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
var _ = require('lodash');
var mongoose = require('./db/mongoose').mongoose;
var Todo = require('./modules/todo').Todo;
var User = require('./modules/user').User;


var app = express();
app.use(bodyParser.json());


app.post('/todos',function(req, res){
	console.log(req.body);
	var newTodo = new Todo({
		text: req.body.text,
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


app.get('/todos/:id', function(req, res){
	var id = req.params.id;
	if( !ObjectId.isValid(id) ){
		return res.status(404).send();
	}
	
	Todo.findById(id).then(function(todo){
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


app.delete('/todos/:id', function(req, res){
	var id = req.params.id;
	if( !ObjectId.isValid(id) ){
		return res.status(404).send();
	}
	
	// Todo.findOneAndRmove({})
	// Todo.findByIdAndRmove('')
	
	Todo.findOneAndRemove({_id: id}).then(function(todo){
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

app.patch('/todos/:id', function(req, res){
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
	
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(function(todo){
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
	console.log(req.body);
	
	var body = _.pick(req.body, ['email','password']);
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

var authenticate = function(req, res, next){
	var token = req.header('x-auth');
	// 检测token
	User.findByToken(token).then(function(user){
		if(!user){
			// res.status(401).send();
			return Promise.reject();
		}
		
		// res.send(user);
		req.user = user;
		req.token = token;
		
		next(); //修改了req对象
	}).catch(function(err){
		res.status(401).send();
	});
	
	
}

app.get('/users/me',authenticate, function(req, res){

	res.send(req.user);
});




app.listen('3000', function(){
	console.log('正在监听3000端口');
})

