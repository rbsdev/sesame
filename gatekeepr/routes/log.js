var dateformat = require('dateformat')
    express = require('express'),
    fs = require('fs'),
    os = require('os'),
    path = require('path'),
    router = express.Router(),
    util = require('util');

router.all('*', function(request, response, next) {
  var message = util.format('%s %s %s %s', dateformat(new Date(), 'yyyy-mm-dd hh:MM:ss'), request.method, request.path, JSON.stringify(request.body));

  process.stdout.write('  ' + message + os.EOL);

  fs.writeFile(path.resolve(__dirname, '..', 'access.log'), message + os.EOL, {
    flag: 'a'
  });
  
  next();
});

module.exports = router;
