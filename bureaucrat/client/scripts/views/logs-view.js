var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    views = bureaucrat.views || (bureaucrat.views = { }),
    Logs,
    rendered;

rendered = function() {
  
};

Logs = function(controller) {
  var that = this;

  that.controller = controller;
  that.template = Template[controller.section.template];

  that.template.rendered = rendered.bind(that);
};

views.Logs = Logs;
