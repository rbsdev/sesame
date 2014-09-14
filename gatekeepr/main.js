var app,
    bodyParser = require('body-parser'),
    express = require('express'),
    log = require('./log'),
    minimist = require('minimist'),
    options;

app = express();

options = minimist(process.argv.slice(2), {
  alias: {
    p: 'port'
  },
  default: {
    port: 80
  }
});

app.use(bodyParser.json());

app.all('*', function(request, response, next) {
  log('%s %s', request.method, request.path);
  next();
});

app.get('/', function(request, response) {
  response.status(200)
          .type('text')
          .send('Sesame Gatekeepr');
});

app.post('/open', function(request, response) {
  // {"mac_address": "01:23:45:67:89:ab"}
  // OR
  // {"user_id": "gibatronic"}

  response.status(200)
          .type('json')
          .send({
            error: false,
            message: 'Sesame Gatekeepr',
            success: true
          });
});

app.listen(options.port);

console.log('Sesame Gatekeepr is alive on port %s', options.port);
