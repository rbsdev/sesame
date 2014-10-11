var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    controllers = bureaucrat.controllers || (bureaucrat.controllers = { }),
    views = bureaucrat.views || (bureaucrat.views = { });

Handlebars.registerHelper('low', function(string) {
  return string.toLowerCase();
});

bureaucrat.router();
bureaucrat.views.Menu();
