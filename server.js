var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

// Controllers
var TimeController = require('./controllers/TimeController.js');


// Middleware
app.use(bodyParser());
app.use(cors());
app.use(express.static(__dirname + '/')); //serve index.html


// REST api
app.post('/api/new-time-query', TimeController.post);
// app.get('/api/data', TimeController.getData);
TimeController.getData();


// Connections
var port = 3000;

// REPLACE NECESSARY
var mongooseUri = 'mongodb://localhost/when-should-i-leave-work';
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Mongoose connected to your soul on:', mongooseUri);
})

app.listen(port, function () {
	console.log('Using the restroom on port:', port);
})
