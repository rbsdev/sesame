var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    views = bureaucrat.views || (bureaucrat.views = { }),
    Dashboard,
    rendered;

rendered = function() {
  
};

Dashboard = function(controller) {
  var that = this;

  that.controller = controller;
  that.template = Template[controller.template];

  that.template.rendered = rendered.bind(that);
};

views.Dashboard = Dashboard;
