var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    collections = bureaucrat.collections || (bureaucrat.collections = { });

Meteor.publish('accessControlBlackList', function() {
  return collections.AccessControlBlackList.find({ });
});

Meteor.publish('accessControlWhiteList', function() {
  return collections.AccessControlWhiteList.find({ });
});