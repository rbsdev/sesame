var OAuth2 = require('oauth').OAuth2,
		config = require('./config');

function Foursquare() {

	return new OAuth2(
		config.client_id,
			config.client_secret,
			'https://foursquare.com',
			'/oauth2/authenticate',
			'/oauth2/access_token',
			null
		);

}

module.exports = Foursquare();
