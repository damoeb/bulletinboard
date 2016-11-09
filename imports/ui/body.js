import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './list.js';
import './create.js';
import './task.js';

Template.body.events({
  'change .hide-old-posts input'(event, instance) {
    instance.state.set('hideOldPosts', event.target.checked);
  },
});
