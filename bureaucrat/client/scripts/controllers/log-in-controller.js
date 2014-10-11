var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.LogIn = (function() {
  var afterAction,
      data,
      LogIn,
      section;

  section = {
    headerless: true,
    humanName: 'Log-in',
    menuless: true,
    path: '/log-in',
    template: 'log-in'
  };

  afterAction = function() {
    var that = this;

    if (!that.view) {
      that.view = new bureaucrat.views.LogIn(LogIn);
    }
  };

  data = function() {
    return section;
  };

  LogIn = RouteController.extend({
    data: data,
    onAfterAction: afterAction,
    view: null
  });

  LogIn.section = section;

  return LogIn;
})();
