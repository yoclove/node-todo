var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var url = 'mongodb://root:799305728@ds062448.mlab.com:62448/todo';
mongoose.connect(url, { useMongoClient: true, promiseLibrary: global.Promise });

var Todo = mongoose.model('Todo',{
	text: {
		type: String	
	},
	completed: {
		type: Boolean	
	},
	completedAt: {
		type: Number
	}
});

var newTodo = new Todo({
	text: '这么麻烦呢'
});


newTodo.save().then(function(doc){
	console.log(doc+'成功保存');
}, function(err){
	console.log('不能存储');
})


var otherTodo = new Todo({
	text: '长安',
	completed: true,
	completedAt: 123
});

otherTodo.save().then(function(doc){
	console.log(doc+'成功保存');
}, function(err){
	console.log('不能存储');
})
