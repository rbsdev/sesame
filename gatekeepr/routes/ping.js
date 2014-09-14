var express = require('express'),
    router = express.Router();

router.get('/', function(request, response) {
  response.status(200)
          .type('text')
          .send('Sesame Gatekeepr');
});

module.exports = router;
