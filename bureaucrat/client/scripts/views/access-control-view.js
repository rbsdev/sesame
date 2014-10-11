var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    collections = bureaucrat.collections || (bureaucrat.collections = { }),
    views = bureaucrat.views || (bureaucrat.views = { });

views.AccessControl = (function() {
  var AccessControl,
      controller,
      $dom = { },
      dom = { },
      events = { },
      jquerify,
      rendered,
      template;

  dom.field = '.access-control-add';

  add = function(collections, event, template) {
    var into = $(event.currentTarget).data('into'),
        map;

    map = {
      black: 'AccessControlBlackList',
      white: 'AccessControlWhiteList'
    };

    if (!(into in map)) {
      return;
    }

    collections[map[into]].insert({
      entry: ''
    });
  };

  jquerify = function(query, element, dom) {
    $dom[element] = $(query);
  };

  rendered = function() {
    _.each(dom, jquerify);
  };

  AccessControl = function(control) {
    controller = control;
    events['click .access-control-add'] = $.proxy(add, AccessControl, collections);
    template = Template[controller.section.template];

    template.rendered = rendered;
    template.events(events);
  };

  return AccessControl;
})();
