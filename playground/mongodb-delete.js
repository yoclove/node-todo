var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://root:799305728@ds062448.mlab.com:62448/todo';
MongoClient.connect(url, function(err, db) {
	if(err){
		return	console.log('数据库不能连接');
	}
	console.log('成功连接数据库');
	// _id 不是一个字符 是一个对象，他有方法
	// db.collection('Users').find({age: 25}).toArray().then(function(docs){
		
		
		
/*	db.collection('Users').deleteMany({name: '潘哲'}).then(function(result){
		console.log(result);
	})*/
	
	
	/*db.collection('Users').deleteOne({name: '雷布斯'}).then(function(result){
		console.log(result);
	})*/
	db.collection('Users').findOneAndDelete({name: '雷布斯'}).then(function(result){
		console.log(result);
	});
	
});