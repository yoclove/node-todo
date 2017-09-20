var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://root:799305728@ds062448.mlab.com:62448/todo';
MongoClient.connect(url, function(err, db) {
	if(err){
		return	console.log('数据库不能连接');
	}
	console.log('成功连接数据库');
/*	db.collection('Todos').insertOne({
		text: '做作业',
		completed: false	
	},function(err, result){
		if (err) {
			return console.log('不能插入');
		}
		console.log(result);
		console.log('插入成功');
	});
	*/
	
	
/*	db.collection('Users').insertOne({
		name: '潘哲',
		age: 25
	},function(err, result){
		if (err) {
			return console.log('不能插入');
		}
		console.log(result);
		console.log('插入成功');
	});
	*/
	
	
	
	db.close();
});