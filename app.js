// Module dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var app = express();
var server = http.createServer(app);

// Sass
//var sass = require('node-sass-middleware');

// Routes
var routes = require('./routes');

// all environments
app.set('port', process.env.PORT || 5500);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', { layout: 'layout.jade' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname,'public/images/favicon.ico')));
// app.use(express.methodOverride());
// app.use(express.cookieParser('your secret here'));
// app.use(express.session());
// app.use(app.router);

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

// Error
// 500
// app.use(function (err, req, res, next) {
// 	res.status(500).render('5xx');
// });

// 404
app.use(function (req, res, next) {
	res.status(404).render('404', { url: req.originalUrl });
});

// Setup server.
server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
