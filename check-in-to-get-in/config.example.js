var config = {
	"client_id": "",
	"client_secret": "",
	"push_secret": "",
	"callback": {
		"response_type": "code",
		"redirect_uri": "https://179.184.113.212/callback",
		"grant_type": "authorization_code"
	},
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
