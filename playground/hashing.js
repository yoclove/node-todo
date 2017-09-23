var SHA256 = require('crypto-js').SHA256;
var jwt = require('jsonwebtoken');

var message = 'i am user numbeer 3';
var hash = SHA256(message).toString();


// 要hashing的对象
var data = {
	id: 8
}

//hashing数据 第一次登陆时，服务器生成
var token = {
	data: data,
	hash: SHA256(JSON.stringify(data) + 'secrectString' ).toString()
}


//验证 以后得到客户端请求时

var serverHash = SHA256(JSON.stringify(token.data) + 'secrectString' ).toString();

//判断
if( serverHash == token.hash ){
	console.log('数据没有被更改');
}else{
	console.log('数据被更改了');
}