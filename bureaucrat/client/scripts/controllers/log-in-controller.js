var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.LogIn = (function() {
  var afterAction,
      data,
      headerless = true,
      humanName = 'Log-in',
      LogIn,
      menuless = true,
      path = '/log-in',
      template = 'log-in';

  afterAction = function() {
    var that = this;

    if (!that.view) {
      that.view = new bureaucrat.views.LogIn(LogIn);
    }
  };

  data = function() {
    return {
      headerless: headerless,
      menuless: menuless
    };
  };

  LogIn = RouteController.extend({
    data: data,
    onAfterAction: afterAction,
    view: null
  });

  LogIn.headerless = headerless;
  LogIn.humanName = humanName;
  LogIn.menuless = menuless;
  LogIn.path = path;
  LogIn.template = template;

  return LogIn;
})();
