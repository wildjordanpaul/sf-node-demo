var express = require('express');
var bodyParser = require('body-parser');
var teamRouter = require('./routers/team-router.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', teamRouter.router);

app.listen(4444);