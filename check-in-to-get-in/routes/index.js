var express = require('express'),
		router  = express.Router();

router.get('/', function(req, res) {

	res.send(200, 'Check-in to get in!');

});

module.exports = router;
