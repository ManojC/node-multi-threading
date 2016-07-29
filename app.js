var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cluster = require('cluster');
var http = require('http');
var numCPUs = 4;

var routes = require('./routes/index');

var app = express();

app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static('./public'));

app.use('/', routes);

if (cluster.isMaster) {
    console.log('master process is - ', process.pid, '\n');
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    console.log('child process is - ', process.pid, '\n');
    app.listen(3000);
}
module.exports = app;
