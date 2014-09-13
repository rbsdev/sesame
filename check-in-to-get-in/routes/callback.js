var express = require('express'),
		router  = express.Router(),
		config  = require('../config'),
		foursquare = require('../foursquare');

router.get('/', function(req, res) {

	var code = req.param('code'),
	callback = function(err, access_token, refresh_token, results) {

		if (err) {

			console.log(err);

		} else {

			req.session.foursquare = { access_token: access_token };

		};

		res.redirect('/');

	};

	foursquare.getOAuthAccessToken(code, config.callback, callback);

});

module.exports = router;
