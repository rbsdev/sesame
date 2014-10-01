var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    views = bureaucrat.views || (bureaucrat.views = { }),
    AccessControl,
    rendered;

rendered = function() {
  
};

AccessControl = function(controller) {
  var that = this;

  that.controller = controller;
  that.template = Template[controller.template];

  that.template.rendered = rendered.bind(that);
};

views.AccessControl = AccessControl;
