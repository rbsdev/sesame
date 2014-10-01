var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.AccessControl = (function() {
  var afterAction,
      AccessControl,
      data,
      headerless = false,
      humanName = 'Access Control',
      icon = '&#61495;',
      menuless = false,
      path = '/access-control',
      template = 'access-control';

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

  AccessControl = RouteController.extend({
    data: data,
    onAfterAction: afterAction,
    view: null
  });

  AccessControl.headerless = headerless;
  AccessControl.humanName = humanName;
  AccessControl.icon = icon;
  AccessControl.menuless = menuless;
  AccessControl.path = path;
  AccessControl.template = template;

  return AccessControl;
})();
