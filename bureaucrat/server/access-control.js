var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    collections = bureaucrat.collections || (bureaucrat.collections = { });

Meteor.publish('accessControlBlackList', function() {
  return collections.AccessControlBlackList.find();
});

Meteor.publish('accessControlBussinessHours', function() {
  return collections.AccessControlBussinessHours.find();
});

Meteor.publish('accessControlWhiteList', function() {
  return collections.AccessControlWhiteList.find();
});

Router.map(function () {
  this.route('access-control.json', {
    where: 'server',

    action: function () {
      var data = { };

      this.response.writeHead(200, {
        "Content-Type": "application/json"
      });

      data.blackList = collections.AccessControlBlackList.find().fetch();
      data.bussinessHours = collections.AccessControlBussinessHours.find().fetch();
      data.whiteList = collections.AccessControlWhiteList.find().fetch();

      this.response.end(JSON.stringify(data));
    }
  });
});
