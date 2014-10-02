var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.Logs = (function() {
  var afterAction,
      Logs,
      data,
      headerless = false,
      humanName = 'Logs',
      icon = '&#61441;',
      menuIndex = 3,
      menuless = false,
      path = '/logs',
      template = 'logs';

  afterAction = function() {
    var that = this;

    if (!that.view) {
      that.view = new bureaucrat.views.Logs(Logs);
    }
  };

  data = function() {
    return {
      headerless: headerless,
      menuless: menuless
    };
  };

  Logs = RouteController.extend({
    data: data,
    onAfterAction: afterAction,
    view: null
  });

  Logs.headerless = headerless;
  Logs.humanName = humanName;
  Logs.icon = icon;
  Logs.menuIndex = menuIndex;
  Logs.menuless = menuless;
  Logs.path = path;
  Logs.template = template;

  return Logs;
})();
