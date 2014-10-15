var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    collections = bureaucrat.collections || (bureaucrat.collections = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { });

controllers.AccessControl = (function() {
  var afterAction,
      AccessControl,
      data,
      section,
      waitOn;

  section = {
    headerless: false,
    humanName: 'Access Control',
    icon: '&#61495;',
    menuIndex: 2,
    menuless: false,
    path: '/access-control',
    template: 'access-control'
  };

  afterAction = function() {
    var that = this;

    if (!that.view) {
      that.view = new bureaucrat.views.AccessControl(AccessControl);
    }
  };

  data = function() {
    var data = section;

    data.blackList = collections.AccessControlBlackList.find();
    data.whiteList = collections.AccessControlWhiteList.find();

    return data;
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
    view: null,
    waitOn: waitOn
  });

  AccessControl.section = section;

  return AccessControl;
})();
