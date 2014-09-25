var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { }),
    configure,
    route,
    routeNotFound,
    router,
    session;

configure = function() {
  Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'not-found',
    onBeforeAction: session
  });
};

route = function(controller, name) {
  Router.route(controller.template, {
    controller: controller,
    path: controller.path,
    template: controller.template
  });
};

router = function() {
  configure();
  _.each(controllers, route);
};

session = function(pause) {
  if (this.route.name == '__notfound__' || this.route.name == 'log-in' || Meteor.userId()) {
    return;
  }

  pause();
  this.redirect('log-in');
};

bureaucrat.router = router;
