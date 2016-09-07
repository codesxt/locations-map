var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/places-map', function(){
	console.log('MongoDB connected.');
});
mongoose.connection.on('error', function () {
  console.error('connection error', arguments);
});
module.exports = mongoose;
