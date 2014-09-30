var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { }),
    views = bureaucrat.views || (bureaucrat.views = { });

views.Header = (function() {
  var data = { },
      $dom = { },
      dom = { },
      events = { },
      Header,
      isActive,
      jquerify,
      logOut,
      map,
      rendered,
      template,
      update;

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

  menu = function() {
    return _.values(data.menu.get());
  };

  rendered = function() {
    _.each(dom, jquerify);
  };

  update = function() {
    var menu = data.menu.get();

    _.each(controllers, function(controller, name) {
      if (!controller.menuless) {
        menu[name] = {
          active: isActive(controller),
          name: controller.humanName,
          template: controller.template
        };
      }
    });
  };

  Header = function() {
    events['click .header-log-out'] = logOut;

    template = Template['header'];
    template.menu = menu;
    template.rendered = rendered;
    template.events(events);

    data.menu = new ReactiveVar({ });

    Router.onAfterAction(update);
  };

  return Header;
})();
