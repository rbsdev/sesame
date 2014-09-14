var dateformat = require('dateformat'),
    util = require('util'),
    log;

log = function() {
  if (arguments.length) {
    console.log('  %s %s', dateformat(new Date(), 'yyyy-mm-dd hh:MM:ss'), util.format.apply(util, arguments));
  } else {
    console.log('');
  }
};

module.exports = log;
