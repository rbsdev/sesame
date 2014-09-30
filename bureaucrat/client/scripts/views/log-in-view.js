var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    views = bureaucrat.views || (bureaucrat.views = { });

views.LogIn = (function() {
  var $dom = { },
      dom = { },
      error,
      events = { },
      hide,
      jquerify,
      loggedIn,
      LogIn,
      rendered,
      show,
      template,
      watch;

  dom.field = '.log-in-field';
  dom.fieldset = '.log-in-fieldset';

  error = function() {
    $dom.fieldset
        .delay(200)
        .queue(function() {
          $(this).addClass('error')
                 .dequeue();
        })
        .delay(800)
        .queue(function() {
          $(this).removeClass('error')
                 .dequeue();

          $dom.field.prop('disabled', false)
                    .focus()
                    .select();
        });
  };

  hide = function(callback) {
    options = [].slice.call(arguments, 1);

    $dom.fieldset
        .delay(200)
        .queue(function() {
          $(this).addClass('hide')
                 .dequeue();
        })
        .delay(400)
        .queue(function() {
          $(this).removeClass('hide')
                 .addClass('transparent')
                 .dequeue();

          if (callback instanceof Function) {
            callback.apply(window, options);
          }
        });
  };

  jquerify = function(query, element, dom) {
    $dom[element] = $(query);
  };

  loggedIn = function(failed) {
    if (failed) {
      error();

      return;
    }

    hide(Router.go.bind(Router), 'dashboard');
  };

  rendered = function() {
    _.each(dom, jquerify);
    show();
  };

  show = function(callback) {
    $dom.fieldset
        .delay(200)
        .queue(function() {
          $(this).removeClass('transparent')
                 .addClass('show')
                 .dequeue();
        })
        .delay(400)
        .queue(function() {
          $(this).removeClass('show')
                 .dequeue();

          $dom.field.focus()
                    .select();

          if (callback instanceof Function) {
            callback();
          }
        });
  };

  watch = function(event, template) {
    var password;

    if (event.which != 13) {
      return;
    }

    password = $dom.field.val();

    if (!password.length) {
      return;
    }

    $dom.field.prop('disabled', true);
    Meteor.loginWithPassword('root', password, loggedIn);
  };

  LogIn = function() {
    events['keydown .log-in-field'] = watch;

    template = Template['log-in'];
    template.rendered = rendered;
    template.events(events);
  };

  LogIn.hide = hide;
  LogIn.show = show;

  return LogIn;
})();
