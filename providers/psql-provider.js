var pg = require('pg');

// change this to your local psql server:
// 		"postgres://username:password@localhost/demo_db"
var conString = "postgres://postgres:password@localhost/demo_db";

var connect = function(response, sql, params, callback) {
	pg.connect(conString, function(err, client, done) {
		client.query(sql, params, function(err, result) {
			if(err) {
				console.log(err)
				response.writeHead(500, {'content-type': 'text/plain'});
				response.end('A databse error occurred');
			} else if(callback)
				callback(response, result);
			else if(params && result.rows.length == 1)
				response.json(result.rows[0]);
			else
				response.json(result.rows);
			done();
		});
	});	
}

exports.getTeamMember = function(response, person_id) {
	var column = isNaN(person_id) ? 'name' : 'person_id';
	var sql = 'SELECT * FROM team WHERE ' + column + ' = $1';
	connect(response, sql, [person_id]);
}

exports.addTeamMember = function(response, body) {
	var params = [
		body.person_id,
		body.manager,
		body.name
	];
	var sql = 'INSERT INTO team (person_id,name,manager) ' + 
		'VALUES ($1,$2,$3) RETURNING *';

	connect(response, sql, params);
}

exports.getTeam = function(response, person_id) {
	var column = isNaN(person_id) ? 'name' : 'person_id';
	var sql = 'WITH RECURSIVE sub_team AS ( '+
		'SELECT person_id,name,manager,0 AS depth ' +
		'FROM team WHERE '+column+' = $1 ' +
		'UNION ' +
		'SELECT t.person_id,t.name,t.manager,s.depth+1 ' +
		'FROM team t JOIN sub_team s ON t.manager = s.person_id ' +
		') SELECT * FROM sub_team; ';
	
	connect(response, sql, [person_id]);
}














