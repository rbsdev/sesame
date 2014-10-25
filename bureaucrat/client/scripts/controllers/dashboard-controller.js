var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.Dashboard = (function() {
  var afterAction,
      Dashboard,
      data,
      section;

  section = {
    headerless: false,
    humanName: 'Dashboard',
    icon: '&#61565;',
    menuIndex: 1,
    menuless: true,
    path: '/dashboard',
    template: 'dashboard'
  };

  afterAction = function() {
    var that = this;

    if (!that.view) {
      that.view = new bureaucrat.views.Dashboard(Dashboard);
    }
  };

  data = function() {
    return section;
  };

  Dashboard = RouteController.extend({
    data: data,
    onAfterAction: afterAction,
    view: null
  });

  Dashboard.section = section;

  return Dashboard;
})();
