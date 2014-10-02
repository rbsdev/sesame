var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { }),
    views = bureaucrat.views || (bureaucrat.views = { });

views.Menu = (function() {
  var anchors,
      data = { },
      $dom = { },
      dom = { },
      events = { },
      Menu,
      isActive,
      jquerify,
      logOut,
      rendered,
      template,
      update;

  anchors = function() {
    return _.values(data.anchors.get());
  };

  isActive = function(controller) {
    var current = Router.current();

    if (!current) {
      return false;
    }

    if (current.route.controller != controller) {
      return false;
    }

    return true;
  };

  jquerify = function(query, element, dom) {
    $dom[element] = $(query);
  };

  logOut = function() {
    Meteor.logout();
  };

  rendered = function() {
    _.each(dom, jquerify);
  };

  update = function() {
    var anchors = data.anchors.get();

    _.each(controllers, function(controller, name) {
      if (!controller.menuless) {
        anchors[controller.template] = {
          active: isActive(controller),
          humanName: controller.humanName,
          icon: controller.icon,
          template: controller.template
        };
      }
    });
  };

  Menu = function() {
    events['click .menu-log-out'] = logOut;

    template = Template['menu'];
    template.anchors = anchors;
    template.rendered = rendered;
    template.events(events);

    data.anchors = new ReactiveVar({ });

    Router.onAfterAction(update);
  };

  return Menu;
})();