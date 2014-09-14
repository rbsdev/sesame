var express = require('express'),
		router  = express.Router(),
		config  = require('../config'),
		foursquare = require('../foursquare');

router.get('/', function(req, res) {

	console.log('Callback');

	var code = req.param('code');
	console.log('Code', code);
	console.log('Config', config.callback);

	foursquare.getOAuthAccessToken(code, config.callback, function(err, access_token, refresh_token, results) {

		console.log('Error',err);
		console.log('Token',access_token);
		
		if (err) {

			console.log(err);

		} else {

			console.log('Foursquare Session', req.session.foursquare);

			req.session.foursquare = {
				access_token : access_token
			};

			console.log('Foursquare Session', req.session.foursquare);

		};

		res.redirect('/');

	});

});

module.exports = router;
