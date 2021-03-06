var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config');

var apiRoute = require('./api');
var handlers = require('./handlers');

var databaseUri;
var port;
var publicRoot = path.resolve(__dirname, '../www');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicRoot));

app.use('/api', apiRoute.router);
app.use('*', handlers.defaultHandler);
app.use(handlers.errorHandler);

databaseUri = 'mongodb://' +
  config.get('mongodb.host') + ':' +
  config.get('mongodb.port') + '/' +
  config.get('mongodb.db');
mongoose.connect(databaseUri);

port = config.get('server.port');
app.listen(port, function onListening() {
  console.log('Listening on ' + port); // eslint-disable-line no-console
});
