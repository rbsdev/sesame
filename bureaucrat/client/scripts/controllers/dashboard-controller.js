var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.Dashboard = (function() {
  var afterAction,
      Dashboard,
      data,
      headerless = false,
      humanName = 'Dashboard',
      menuless = false,
      path = '/',
      template = 'dashboard';

  afterAction = function() {
    if (!this.view) {
      this.view = new bureaucrat.views.Dashboard;
    }
  };

  data = function() {
    return {
      headerless: headerless,
      menuless: menuless
    };
  };

  Dashboard = RouteController.extend({
    data: data,
    onAfterAction: afterAction,
    view: null
  });

  Dashboard.headerless = headerless;
  Dashboard.humanName = humanName;
  Dashboard.menuless = menuless;
  Dashboard.path = path;
  Dashboard.template = template;

  return Dashboard;
})();
