var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Place = require('./models/place');
app.use(bodyParser.json());
app.use('/api/places', require('./controllers/api/places'));
app.use(require('./controllers/static'));
app.listen(3000, function(){
	console.log('Server listening on', 3000);
});
