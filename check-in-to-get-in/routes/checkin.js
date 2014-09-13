var express = require('express'),
		router 	= express.Router(),
		config 	= require('../config');

router.post('/', function(req, res) {

	var checkin = request.param('checkin');

	if (checkin) {

		console.log(JSON.parse(checkin));

	} else {

		console.log(req)

	};

	res.send(204);

});

module.exports = router;
