var app,
    bodyParser = require('body-parser'),
    child_process = require('child_process'),
    express = require('express'),
    fs = require('fs'),
    isBusinessHours = false,
    list,
    log = require('./log'),
    minimist = require('minimist'),
    now,
    options,
    os = require('os');

app = express();

fs.exists('list.json', function(exists) {
  if (exists) {
    list = require('list');
  } else {
    list = {
      black: [ ],
      white: [ ]
    };
  }
});

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
  var hasMacAddress = false,
      hasUserId = false,
      macAddress = request.body.mac_address,
      userId = request.body.user_id;

  response.status(200).type('json')

  hasMacAddress = macAddress ? true : false;
  hasUserId = userId ? true : false;

  if (hasMacAddress && hasUserId) {
    response.send({
      error: true,
      message: 'ambiguous request, either pass mac_address or user_id, never both',
      success: false
    });

    return;
  }

  if (!hasMacAddress && !hasUserId) {
    response.send({
      error: true,
      message: 'identify yourself, pass either mac_address or user_id',
      success: false
    });

    return;
  }

  if (hasMacAddress) {
    if (list.black.indexOf(macAddress) != -1 || list.white.indexOf(macAddress) == -1) {
      response.send({
        error: true,
        message: 'you\'re not allowed, bounce',
        success: false
      });

      return;
    }

    child_process.exec('python gpio.py', {
      cwd: __dirname
    });

    response.send({
      error: false,
      message: 'welcome',
      success: true
    });

    return;
  }

  if (hasUserId) {
    now = new Date();
    isBusinessHours = now.getHours() > 9 && now.getHours() < 19;
    isBusinessHours = true;

    if (list.black.indexOf(userId) != -1 || !isBusinessHours) {
      response.send({
        error: true,
        message: 'you\'re not allowed, bounce',
        success: false
      });

      return;
    }

    child_process.exec('python gpio.py', {
      cwd: __dirname
    });

    response.send({
      error: false,
      message: 'welcome',
      success: true
    });

    return;
  }

  response.send({
    error: true,
    message: 'unknow error, sorry',
    success: false
  });
});

app.listen(options.port);

process.stdout.write('Sesame Gatekeepr is alive on port ' + options.port + os.EOL);

process.on('SIGINT', function() {
  process.stdout.write('\033[999D\033[KSesame Gatekeepr is going down' + os.EOL);
  process.exit(0);
});
