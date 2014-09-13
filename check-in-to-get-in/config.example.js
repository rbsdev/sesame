var config = {
	"client_id": "",
	"client_secret": "",
	"push_secret": "",
	"redirect_uri": "/callback",
	"response_type": "code",
	"grant_type": "authorization_code",
	"ssl": {
		"key": "certificates/<name>.key",
		"cert": "certificates/<name>.crt"
	},
	"session": {
		"secret": "<secret>",
		"resave": true,
		"saveUninitialized": true
	}
}

module.exports = config;
