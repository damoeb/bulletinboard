import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Tasks} from '../api/tasks.js';

import './header.html';
import './list.html';

Template.list.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.list.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideOldPosts')) {
      // If hide completed is checked, filter tasks
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      return Tasks.find({'createdAt': {$gte: today}}, {sort: {createdAt: -1}});
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, {sort: {createdAt: -1}});
  },

  groups() {

    var tasks = Tasks.find({}, {sort: {createdAt: -1}}).fetch();

    console.log(tasks);
    var groups = _.groupBy(tasks, function (task) {
      // console.log(task);
      return task && task.createdAt && task.createdAt.toDateString();
    });

    return _.map(groups, function (group) {
      return {
        date: group[0].createdAt,
        tasks: group
      }
    });
  }
});

Template.list.helpers({
  is_today(date) {
    return date && date.toDateString() === new Date().toDateString();
  }
});
