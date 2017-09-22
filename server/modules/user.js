var mongoose = require('mongoose');

var User = mongoose.model('User',{
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

/*var user = new User({
	email: '111111@qq.com'
})

user.save().then(function(doc){
	console.log(doc+'成功保存');
}, function(err){
	console.log('不能存储');
});*/



module.exports  = {
	User: User
}