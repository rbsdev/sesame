var express = require('express'),
		router  = express.Router(),
		config  = require('../config'),
		foursquare = require('../foursquare');

router.get('/', function(req, res) {

	console.log('Callback', req);

	var code   = req.param('code'),
		config = {
			redirect_uri: config.callback.redirect_uri
			grant_type: config.callback.grant_type
	    };

	console.log('Code', code);
	console.log('Config', config);

	foursquare.getOAuthAccessToken(code, config, function(err, access_token, refresh_token, results) {

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
