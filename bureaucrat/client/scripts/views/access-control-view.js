var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    collections = bureaucrat.collections || (bureaucrat.collections = { }),
    library = bureaucrat.library || (bureaucrat.library = { }),
    views = bureaucrat.views || (bureaucrat.views = { });

views.AccessControl = (function() {
  var AccessControl,
      controller,
      $dom = { },
      dom = { },
      drag,
      events = { },
      findCollection,
      insert,
      jquerify,
      map = { },
      minutesToTime,
      remove,
      rendered,
      setPositions,
      stop,
      template,
      update;

  dom.data = '.access-control-bussines-hour .access-control-data';
  dom.end = '.access-control-end';
  dom.start = '.access-control-start';

  map = {
    black: 'AccessControlBlackList',
    white: 'AccessControlWhiteList'
  };

  drag = function(event, ui) {
    var limit = $dom.data.width() - $dom.end.width() - 3,
        minutes,
        time;

    if (ui.position.left <= 0) {
      ui.position.left = 0;
    }

    if (ui.position.left >= limit) {
      ui.position.left = limit;
    }

    minutes = (ui.position.left * 1439) / limit;
    minutes -= minutes % 5;

    if (this == $dom.end.get(0)) {
      collections.AccessControlBussinessHours.update('end', {
        $set: {
          minutes: minutes
        }
      });
    }

    if (this == $dom.start.get(0)) {
      collections.AccessControlBussinessHours.update('start', {
        $set: {
          minutes: minutes
        }
      });
    }
  };

  findCollection = function(element) {
    var into = $(element).parents('.access-control-block').data('into');

    if (!(into in map)) {
      return null;
    }

    return collections[map[into]];
  };

  insert = function(event, template) {
    var collection = findCollection(event.currentTarget);

    if (!collection) {
      return;
    }

    collection.insert({ });
  };

  jquerify = function(query, element, dom) {
    $dom[element] = $(query);
  };

  minutesToTime = function(minutes) {
    return library.pad(minutes / 60 >> 0) + ':' + library.pad(minutes % 60 >> 0);
  };

  remove = function(event, template) {
    var collection = findCollection(event.currentTarget);

    event.preventDefault();

    if (!collection) {
      return;
    }

    collection.remove(this._id);
  };

  rendered = function() {
    var options = {
      axis: 'x',
      drag: drag,
      stop: stop
    };

    _.each(dom, jquerify);

    $dom.end.draggable(options);
    $dom.start.draggable(options);
  };

  setPositions = function() {
    var limit,
        endPosition,
        startPosition;

    if (!this.bussinessHours.end || !this.bussinessHours.start) {
      return;
    }

    limit = $dom.data.width() - $dom.end.width() - 3;

    endPosition = (this.bussinessHours.end.minutes * limit) / 1439;
    startPosition = (this.bussinessHours.start.minutes * limit) / 1439;

    $dom.end.css({
      left: endPosition + 'px'
    });

    $dom.start.css({
      left: startPosition + 'px'
    })
  };

  stop = function(event, ui) {

  };

  update = function(event, template) {
    var collection = findCollection(event.currentTarget),
        data = { },
        field,
        $input = $(event.currentTarget);

    field = $input.data('field');

    if (!collection || !field) {
      return;
    }

    data[field] = $.trim($(event.currentTarget).val());

    collection.update(this._id, {
      $set: data
    });
  };

  watch = function(event, template) {
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };

  AccessControl = function(control) {
    var helpers;

    controller = control;

    events['click .access-control-add'] = insert;
    events['contextmenu .access-control-entry'] = remove;
    events['keydown .access-control-entry'] = watch;
    events['keyup .access-control-entry'] = _.throttle(update, 300);
    events['keyup .access-control-name'] = _.throttle(update, 300);

    helpers = {
      minutesToTime: minutesToTime,
      setPositions: setPositions
    };

    template = Template[controller.section.template];

    template.helpers(helpers);
    template.rendered = rendered;
    template.events(events);
  };

  return AccessControl;
})();
