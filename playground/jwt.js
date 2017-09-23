var SHA256 = require('crypto-js').SHA256;
var jwt = require('jsonwebtoken');

var message = 'i am user numbeer 3';
var hash = SHA256(message).toString();

var data = {
	id: 30
}
// sign 返回token值 传入数据和secrect

var token = jwt.sign(data,'125555'); // token值 返回客户端，登陆或者注册的时候用， 
									 // token 存在UserSchema 中的tokens.token里面
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTUwNjE1ODYyN30.Ofn7L1BD21wVUp6CLJ1G8gwwn920v6mjlAhR_OfvCyo  这个就是token 一个字符串 里面三个信息

console.log('加密', token);

var decoded = jwt.verify(token, '125555');

//验证用户带来的token 得到token里面的数据 比如id
console.log('解码', decoded);
