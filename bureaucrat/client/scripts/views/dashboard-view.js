var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    views = bureaucrat.views || (bureaucrat.views = { });

views.Dashboard = (function() {
  var Dashboard,
      controller,
      $dom = { },
      dom = { },
      events = { },
      jquerify,
      rendered,
      template;

  jquerify = function(query, element, dom) {
    $dom[element] = $(query);
  };

  rendered = function() {
    _.each(dom, jquerify);
  };

  Dashboard = function(control) {
    controller = control;
    template = Template[controller.section.template];

    template.rendered = rendered;
    template.events(events);
  };

  return Dashboard;
})();
