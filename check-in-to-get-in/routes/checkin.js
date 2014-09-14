var express = require('express'),
		router 	= express.Router(),
		config 	= require('../config');

router.post('/', function(req, res) {

	console.log('Checkin', req);

	var checkin = request.param('checkin');

	console.log('Checkin', checkin);

	if (checkin) {

		console.log(JSON.parse(checkin));

	} else {

		console.log(req)

	};

	res.send(204);

});

module.exports = router;
