app.post('/users',function(req, res){
	console.log(req.body);
	
	var body = _.pick(req.body, ['email','password']);
	
	var user = new User(body);
	user.save().then(function(){
		res.send(doc);
		
		//可以在这里返回token 但是不公用
		
		// User.method 是模块方法
		// user.method 是实例方法，每个实例
		// generateAuthToken() 给每个新创建user document添加token 保存 并返回token给客户端
		
		// User 不需要单个实例 model方法
		// User.findByToken() 自定义的model方法
		// user.generateAuthToken();
	}).then(function(token){
		res.header('x-auth', token).send(user);	
	}).catch(function(e){
		res.status(400).send(e);
	})
});

