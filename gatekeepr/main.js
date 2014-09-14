var app,
    bodyParser = require('body-parser'),
    express = require('express'),
    log = require('./routes/log'),
    minimist = require('minimist'),
    open = require('./routes/open'),
    options,
    os = require('os'),
    ping = require('./routes/ping');

app = express();

options = minimist(process.argv.slice(2), {
  alias: {
    p: 'port'
  },
  default: {
    port: 80
  }
});

app.use(bodyParser.json())
   .use(log)
   .use(ping)
   .use(open)
   .listen(options.port);

process.stdout.write('Sesame Gatekeepr is alive on port ' + options.port + os.EOL);

process.on('SIGINT', function() {
  process.stdout.write('\033[999D\033[KSesame Gatekeepr is going down' + os.EOL);
  process.exit(0);
});
