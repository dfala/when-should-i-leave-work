var express 		= require('express'),
		cors 				= require('cors'),
		bodyParser 	= require('body-parser'),
		app 				= express(),
		ejs         = require('ejs'),
		mongoose 		= require('mongoose');

// Controllers
var TimeController 		= require('./controllers/TimeController.js'),
		RenderController	= require('./controllers/RenderController.js');


// Middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');


// REST api
app.post('/api/new-time-query', TimeController.post);
app.get('/api/data/:queryId', RenderController.serveQuery);
app.get('/api/queries', RenderController.serveQueries);

TimeController.createCompleted();
// TimeController.identifyQueries();

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
