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
  incompleteCount() {
    return Tasks.find({checked: {$ne: true}}).count();
  },
});
