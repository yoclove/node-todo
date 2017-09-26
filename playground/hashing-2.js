var bcrypt = require('bcryptjs');

var pwd ="panzhe";


/*bcrypt.genSalt(10, function(err, salt){
	bcrypt.hash(pwd, salt, function(err, hash){
		console.log(salt);
		console.log(hash);
	})
})*/
var hashedPwd = '$2a$10$Oqi2PHv/F5J1hXwjX94IbuwsyaXSz0WNcqZ2SGft/1sDjtO4W3Phm';
bcrypt.compare(pwd, hashedPwd, function(err,  res){
	console.log(res);
})