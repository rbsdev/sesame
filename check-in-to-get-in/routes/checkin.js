var express = require('express'),
		http = require('http'),
		router = express.Router(),
		config = require('../config'),
		exec = require("child_process").exec;

router.post('/', function(req, res) {

	console.log('Checkin');

	var checkin = req.param('checkin');

	if (checkin) {

		checkin = JSON.parse(checkin);

		var data = JSON.stringify({
			user_id : checkin.user.id,
			user_name : checkin.user.firstname
		});

		var headers = {
			'Content-Type': 'application/json',
			'Content-Length': data.length
		};

		var options = {
			host: '172.20.93.47',
			port: 80,
			path: '/open',
			method: 'POST',
			headers: headers
		};

		console.log('Check-in: ', data);

		var req = http.request(options, function(_res) {

			_res.setEncoding('utf8');
		  	_res.on('data', function (checkedIn) {

		  	console.log('Checked-in? ', checkedIn);
		  	res.send(204);

		  });

		});

		req.write(data);
		req.end();

	} else {

		console.log(req)
		res.send(204);

	};

});

module.exports = router;
