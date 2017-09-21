var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://root:799305728@ds062448.mlab.com:62448/todo';
MongoClient.connect(url, function(err, db) {
	if(err){
		return	console.log('数据库不能连接');
	}
	console.log('成功连接数据库');
	// _id 不是一个字符 是一个对象，他有方法
	/*db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('59c319a8c9ca09098ce9dd80')
	},{
		$set: {
			age: 40
		} 
	},{
		returnOriginal: false
	}).then(function(result){
		console.log(result);
	});
	*/
	
	db.collection('Users').findOneAndUpdate({
		name: '潘哲'
	},{
		$set: {
			name: '麦迪'
		} 
	},{
		returnOriginal: false
	}).then(function(result){
		console.log(result);
	});
	
	
});