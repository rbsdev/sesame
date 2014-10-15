var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    collections = bureaucrat.collections || (bureaucrat.collections = { }),
    views = bureaucrat.views || (bureaucrat.views = { });

views.AccessControl = (function() {
  var AccessControl,
      controller,
      $dom = { },
      dom = { },
      events = { },
      findCollection,
      insert,
      jquerify,
      map = { },
      remove,
      rendered,
      template,
      update;

  dom.field = '.access-control-add';

  map = {
    black: 'AccessControlBlackList',
    white: 'AccessControlWhiteList'
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

  remove = function(event, template) {
    var collection = findCollection(event.currentTarget);

    event.preventDefault();

    if (!collection) {
      return;
    }

    collection.remove(this._id);
  };

  rendered = function() {
    _.each(dom, jquerify);
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
    controller = control;

    events['click .access-control-add'] = insert;
    events['contextmenu .access-control-entry'] = remove;
    events['keydown .access-control-entry'] = watch;
    events['keyup .access-control-entry'] = _.throttle(update, 300);
    events['keyup .access-control-name'] = _.throttle(update, 300);

    template = Template[controller.section.template];

    template.rendered = rendered;
    template.events(events);
  };

  return AccessControl;
})();
