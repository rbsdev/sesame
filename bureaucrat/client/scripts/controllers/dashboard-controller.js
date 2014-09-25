var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { }),
    afterAction,
    Dashboard,
    data;

afterAction = function() {
  if (!this.view) {
    this.view = new bureaucrat.views.Dashboard;
  }
};

Dashboard = RouteController.extend({
  onAfterAction: afterAction,
  view: null
});

Dashboard.path = '/';
Dashboard.template = 'dashboard';

controllers.Dashboard = Dashboard;
