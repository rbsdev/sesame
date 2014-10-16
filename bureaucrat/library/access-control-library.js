var bureaucrat = this.bureaucrat || (this.bureaucrat = { }),
    collections = bureaucrat.collections || (bureaucrat.collections = { });

collections.AccessControlBlackList = new Meteor.Collection('accessControlBlackList');
collections.AccessControlBussinessHours = new Meteor.Collection('accessControlBussinessHours');
collections.AccessControlWhiteList = new Meteor.Collection('accessControlWhiteList');
