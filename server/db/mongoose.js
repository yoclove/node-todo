var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var url = 'mongodb://root:799305728@ds062448.mlab.com:62448/todo';
mongoose.connect(url, { useMongoClient: true, promiseLibrary: global.Promise });


module.exports  = {
	mongoose: mongoose
}