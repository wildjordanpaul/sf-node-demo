var express = require('express');
var db = require('../providers/psql-provider.js');
var router = express.Router();

// middleware
router.use(function(req, res, next) {
	console.log(req.method + ': ' + req.url);
	next();
});

router.get('/team/member/:person_id', function(request, response) {
	db.getTeamMember(response, request.params.person_id);
});

router.post('/team/member', function(request, response) {
	db.addTeamMember(response, request.body);
});

router.get('/team/:person_id', function(request, response) {
	db.getTeam(response, request.params.person_id);
});

exports.router = router;