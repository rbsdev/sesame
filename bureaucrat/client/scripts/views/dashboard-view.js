var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    views = bureaucrat.views || (bureaucrat.views = { }),
    Dashboard,
    rendered;

rendered = function() {
  
};

Dashboard = function() {
  this.template = Template['dashboard'];
  this.template.rendered = rendered.bind(this);
};

views.Dashboard = Dashboard;
