var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { }),
    afterAction,
    data,
    LogIn;

afterAction = function() {
  if (!this.view) {
    this.view = new bureaucrat.views.LogIn;
  }
};

data = function() {
  return {
    headerless: true
  };
};

LogIn = RouteController.extend({
  data: data,
  onAfterAction: afterAction,
  view: null
});

LogIn.path = '/log-in';
LogIn.template = 'log-in';

controllers.LogIn = LogIn;
