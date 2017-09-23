var User = require('../modules/user').User;

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

module.exports  = {
	authenticate: authenticate
}

