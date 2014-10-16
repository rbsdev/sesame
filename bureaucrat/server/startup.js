var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    collections = bureaucrat.collections || (bureaucrat.collections = { });

startup = function () {
  if (collections.AccessControlBussinessHours.find().count() == 0) {
    collections.AccessControlBussinessHours.insert({
      _id: 'end',
      minutes: 1080
    });

    collections.AccessControlBussinessHours.insert({
      _id: 'start',
      minutes: 540
    });
  }
};

Meteor.startup(startup);
