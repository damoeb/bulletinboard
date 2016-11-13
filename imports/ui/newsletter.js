import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import './newsletter.html';

Template.create.events({
  'submit .new-task-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const title = target.title.value;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', title, text);

    // Clear form
    target.title.value = '';
    target.text.value = '';
    Router.go('/');
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  }
});
