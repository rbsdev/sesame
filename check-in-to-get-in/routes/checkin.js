var express = require('express'),
		router = express.Router(),
		config = require('../config'),
		exec = require("child_process").exec;

router.post('/', function(req, res) {

	console.log('Checkin');

	var checkin = req.param('checkin');

	if (checkin) {

		console.log(JSON.parse(checkin));

	} else {

		console.log(req)

	};

	res.send(204);

});

module.exports = router;
