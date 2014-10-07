var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.AccessControl = (function() {
  var afterAction,
      AccessControl,
      data,
      headerless = false,
      humanName = 'Access Control',
      icon = '&#61495;',
      menuIndex = 2,
      menuless = false,
      path = '/access-control',
      template = 'access-control',
      waitOn;

  afterAction = function() {
    var that = this;

    if (!that.view) {
      that.view = new bureaucrat.views.AccessControl(AccessControl);
    }
  };

  data = function() {
    return {
      headerless: headerless,
      menuless: menuless
    };
  };

  waitOn = function() {
    return [
      Meteor.subscribe('accessControlBlackList'),
      Meteor.subscribe('accessControlWhiteList')
    ];
  };

  AccessControl = RouteController.extend({
    data: data,
    onAfterAction: afterAction,
    view: null
  });

  AccessControl.headerless = headerless;
  AccessControl.humanName = humanName;
  AccessControl.icon = icon;
  AccessControl.menuIndex = menuIndex;
  AccessControl.menuless = menuless;
  AccessControl.path = path;
  AccessControl.template = template;
  AccessControl.waitOn = waitOn;

  return AccessControl;
})();
