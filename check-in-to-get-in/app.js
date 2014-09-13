var config 			 = require('./config'),
		express 		 = require('express'),
		session			 = require('express-session'),
		https				 = require('https'),
		fs 					 = require('fs'),
		cookieParser = require('cookie-parser'),
		bodyParser   = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded())
	 .use(cookieParser())
	 .use(session(config.session));

var index = require('./routes'),
		connect  = require('./routes/connect'),
		callback = require('./routes/callback'),
		checkin  = require('./routes/checkin');

app.use('/', index)
	 .use('/connect', connect)
	 .use('/callback', callback)
	 .use('/checkin', checkin)
	 .use(function(err, req, res, next) {
			 
			 res.status(err.status || 500);
			 res.send(err.status || 500, err.message);

		});

var server = https.createServer({

	key  : fs.readFileSync(config.ssl.key),
	cert : fs.readFileSync(config.ssl.cert)	

}, app).listen(443);
