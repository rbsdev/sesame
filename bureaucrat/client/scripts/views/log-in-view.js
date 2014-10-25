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

  dom.input = '.log-in-input';
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

          $dom.input.prop('disabled', false)
                    .focus()
                    .select();
        });
  };

  hide = function(callback) {
    var options = [].slice.call(arguments, 1);

    // $dom.fieldset
    //     .delay(200)
    //     .queue(function() {
    //       $(this).addClass('hide')
    //              .dequeue();
    //     })
    //     .delay(400)
    //     .queue(function() {
    //       $(this).removeClass('hide')
    //              .addClass('transparent')
    //              .dequeue();

    //       if (callback instanceof Function) {
    //         callback.apply(window, options);
    //       }
    //     });

    if (callback instanceof Function) {
      callback.apply(window, options);
    }
  };

  jquerify = function(query, element, dom) {
    $dom[element] = $(query);
  };

  loggedIn = function(failed) {
    if (failed) {
      error();

      return;
    }

    hide(Router.go.bind(Router), 'access-control');
  };

  rendered = function() {
    _.each(dom, jquerify);
    show();
  };

  show = function(callback) {
    var options = [].slice.call(arguments, 1);

    // $dom.fieldset
    //     .delay(200)
    //     .queue(function() {
    //       $(this).removeClass('transparent')
    //              .addClass('show')
    //              .dequeue();
    //     })
    //     .delay(400)
    //     .queue(function() {
    //       $(this).removeClass('show')
    //              .dequeue();

    //       $dom.input.focus()
    //                 .select();

    //       if (callback instanceof Function) {
    //         callback();
    //       }
    //     });

    $dom.input.focus().select();

    if (callback instanceof Function) {
      callback.apply(window, options);
    }
  };

  watch = function(event, template) {
    var password;

    if (event.which != 13) {
      return;
    }

    password = $dom.input.val();

    if (!password.length) {
      return;
    }

    $dom.input.prop('disabled', true);
    Meteor.loginWithPassword('root', password, loggedIn);
  };

  LogIn = function(controller) {
    events['keydown ' + dom.input] = watch;
    template = Template[controller.section.template];

    template.rendered = rendered;
    template.events(events);
  };

  LogIn.hide = hide;
  LogIn.show = show;

  return LogIn;
})();
