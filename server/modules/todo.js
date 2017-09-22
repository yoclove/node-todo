var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});



/*var newTodo = new Todo({
	text: '这么麻烦呢'
});


newTodo.save().then(function(doc){
	console.log(doc+'成功保存');
}, function(err){
	console.log('不能存储');
})*/



module.exports  = {
	Todo: Todo
}