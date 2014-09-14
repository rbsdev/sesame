var dateformat = require('dateformat')
    express = require('express'),
    router = express.Router();

router.all('*', function(request, response, next) {
  console.log('  %s %s %s', dateformat(new Date(), 'yyyy-mm-dd hh:MM:ss'), request.method, request.path);

  next();
});

module.exports = router;
