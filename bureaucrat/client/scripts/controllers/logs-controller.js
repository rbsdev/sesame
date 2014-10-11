var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.Logs = (function() {
  var afterAction,
      data,
      Logs,
      section;

  section = {
    headerless: false,
    humanName: 'Logs',
    icon: '&#61441;',
    menuIndex: 3,
    menuless: false,
    path: '/logs',
    template: 'logs'
  };

  afterAction = function() {
    var that = this;

    if (!that.view) {
      that.view = new bureaucrat.views.Logs(Logs);
    }
  };

  data = function() {
    return section;
  };

  Logs = RouteController.extend({
    data: data,
    onAfterAction: afterAction,
    view: null
  });

  Logs.section = section;

  return Logs;
})();
