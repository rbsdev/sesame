this.DashboardView = function() {
  this.template = Template['dashboard'];
  this.template.rendered = this.rendered.bind(this);
};

DashboardView.prototype.template = null;

DashboardView.prototype.rendered = function() {
  
};
