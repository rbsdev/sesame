var session = function(pause) {
  if (!Meteor.userId()) {
    Router.go('log-in');
    pause();
  }
};

Router.onBeforeAction(session, {
  except: ['log-in']
});

Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'not-found'
});

Router.map(function() {
  this.route('dashboard', {
    controller: DashboardController,
    path: '/'
  });

  this.route('log-in', {
    controller: LogInController,
    path: '/log-in'
  });
});
