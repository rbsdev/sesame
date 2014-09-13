var app,
    bodyParser = require('body-parser'),
    dateformat = require('dateformat'),
    express = require('express'),
    gpio = require('pi-gpio'),
    minimist = require('minimist'),
    options,
    pin = 3;

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
  console.log('  %s %s %s', dateformat(new Date(), 'yyyy-mm-dd hh:MM:ss'), request.method, request.path);
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

  gpio.open(pin, "output", function(err) {
    gpio.write(pin, 1, function() {
      setTimeout(function() {
        gpio.write(pin, 0, function() {
          gpio.close(pin);
        });
      }, 1000);
    });
  });

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
