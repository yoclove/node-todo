function agePromise(age){
	return new Promise(function(resove, reject){
		if(age > 18){
			resove('可以观看');
		}else{
			reject('失败：你还是个孩子');
		}
	});
}

/*var catPromise = new Promise(function(resove, reject){
	var age = 30;
	if(age > 18){
		resove('可以观看')
	}else{
		reject('失败：你还是个孩子')
	}
});
*/

// 多个 promise 就一直then 最后catch错误
agePromise(50).then(function(result){
	console.log(result);
	return agePromise(20); // 返回一个新的promise 下面就可以连续使用promise then
}).then(function(result){
	console.log('第二个', result);
}).catch(function(err){
	console.log(err);
});
// catch方法 ,来捕捉前面所有错误
