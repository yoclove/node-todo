var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');


// var User = mongoose.model('User',UserSchema);  我们不能给User添加方法，所以依赖UserSchema 来添加方法

var UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			minlength: 1,
			trim: true,
			unique: true,
			validate: {
				isAsync:false,
				validator: validator.isEmail,
				message: '{VALUE} 不是正确的邮箱'
			}
		},
		password: {
			type: String,
			required: true,
			minlength: 6
		},
		tokens: [{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}]
	});
// UserSchema.methods 是一个对象 我们可以给他添加方法，可以在实例中使用，其中的this就是每个实例	
UserSchema.methods.toJSON = function(){
	var user = this;
	var userObj = user.toObject();
	return _.pick(userObj,['_id','email']);
	//只返回email 和 id
}


UserSchema.methods.generateAuthToken = function(){
	// 这个函数来产品 tokens 数组 UserSchema.tokens
	
	var user = this; 
	var access = 'auth';
	
	//token 里面存了一个id 一个access
	var token = jwt.sign({_id: user._id.toHexString(), access: access}, '123456').toString();
	
	user.tokens.push({
		access: access,
		token: token 
	});
	
	return user.save().then(function(){ //返回promise 可以chain
		return token;
	})
}

UserSchema.statics.findByToken = function(token){
	var User = this; //
	var decoded;
	
	try {
		decoded = jwt.verify(token, '123456');	
	} catch (e){
		/*return new Promise(function(resove, reject){
			reject();
		});*/
		return Promise.reject();
	}
	
	return User.findOne({
			'_id': decoded._id,
			'tokens.access': 'auth',
			'tokens.token': token
		})
	
}
var User = mongoose.model('User',UserSchema); //产生User模块


module.exports  = {
	User: User
}

