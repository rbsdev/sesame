var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.Dashboard = (function() {
  var afterAction,
      Dashboard,
      data,
      headerless = false,
      humanName = 'Dashboard',
      icon = '&#61565;',
      menuIndex = 1,
      menuless = false,
      path = '/',
      template = 'dashboard';

  afterAction = function() {
    var that = this;

    if (!that.view) {
      that.view = new bureaucrat.views.Dashboard(Dashboard);
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
  Dashboard.icon = icon;
  Dashboard.menuIndex = menuIndex;
  Dashboard.menuless = menuless;
  Dashboard.path = path;
  Dashboard.template = template;

  return Dashboard;
})();
