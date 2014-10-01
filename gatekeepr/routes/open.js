var child_process = require('child_process'),
    error,
    express = require('express'),
    fs = require('fs'),
    isBusinessHours,
    list,
    path = require('path'),
    router = express.Router(),
    speak,
    success,
    triggerGpio;

fs.exists(path.resolve(__dirname, '..', 'list.json'), function(exists) {
  if (exists) {
    list = require(path.resolve(__dirname, '..', 'list'));
  } else {
    list = {
      black: [ ],
      white: [ ]
    };
  }
});

error = function(response, message) {
  response.send({
    error: true,
    message: message,
    success: false
  });
};

isBusinessHours = function() {
  var day,
      hour,
      isBusinessDay,
      isBusinessHour,
      now = new Date();

  day = now.toDateString().substr(0, 3).toLowerCase();
  hour = now.getHours();

  isBusinessDay = ['mon', 'tue', 'wed', 'thu', 'fri'].indexOf(day) != -1;
  isBusinessHour = hour > 9 && hour < 18;

  return isBusinessDay && isBusinessHour;
};

speak = function(message) {
  // child_process.exec('sh say.sh "' + message + '"', {
  //   cwd: path.resolve(__dirname, '..')
  // });
};

success = function(response, message) {
  response.send({
    error: false,
    message: message,
    success: true
  });
};

triggerGpio = function() {
  child_process.exec('python gpio.py', {
    cwd: path.resolve(__dirname, '..')
  });
};

router.post('/open', function(request, response) {
  var hasMacAddress,
      hasUserId,
      hasUserName,
      isJson,
      macAddress = request.body.mac_address,
      userName = request.body.user_name;
      userId = request.body.user_id;

  response.status(200).type('json')

  hasMacAddress = !!macAddress;
  hasUserId = !!userId;
  hasUserName = !!userName;
  isJson = request.get('Content-Type') == 'application/json';

  if (!isJson) {
    error(response, 'wrong content-type, application/json is required');

    return;
  }

  if (hasMacAddress && hasUserId) {
    error(response, 'ambiguous request, either pass mac_address or user_id, never both');

    return;
  }

  if (!hasMacAddress && !hasUserId) {
    error(response, 'identify yourself, pass either mac_address or user_id');

    return;
  }

  if (hasMacAddress) {
    if (list.black.indexOf(macAddress) != -1 || list.white.indexOf(macAddress) == -1) {
      error(response, 'you\'re not allowed, bounce');

      return;
    }

    list.white.forEach(function(item, index, items) {
      if (item.mac_address == macAddress) {
        speak(item.name);
      }
    });

    triggerGpio();
    success(response, 'welcome');

    return;
  }

  if (hasUserId) {
    if (list.black.indexOf(userId) != -1 || !isBusinessHours()) {
      error(response, 'you\'re not allowed, bounce');

      return;
    }

    if (hasUserName) {
      speak(userName);
    }

    triggerGpio();
    success(response, 'welcome');

    return;
  }

  error(response, 'unknow error, sorry');
});

module.exports = router;
