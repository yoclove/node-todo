var mypromise = new Promise(function(resove, reject){
	var a = 4;
	if(a > 5){
		resove('我成功了')
	}else{
		reject('失败：4000')
	}
})

mypromise.then(function(result){
	console.log(result);
}, function(err){
	console.log(err);
})