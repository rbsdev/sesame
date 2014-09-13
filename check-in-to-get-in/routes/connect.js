var express = require('express'),
    router  = express.Router(),
    config  = require('../config'),
    foursquare = require('../foursquare');

router.get('/', function(req, res) {

  if (req.session.foursquare) {
  
    res.redirect('/');
  
  } else {

    res.redirect(foursquare.getAuthorizeUrl(config.callback));

  };

});

module.exports = router;
