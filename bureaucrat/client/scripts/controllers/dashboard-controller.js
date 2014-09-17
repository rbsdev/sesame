this.DashboardController = RouteController.extend({
  view: null,

  onAfterAction: function() {
    if (!this.view) {
      this.view = new DashboardView();
    }
  }
});
