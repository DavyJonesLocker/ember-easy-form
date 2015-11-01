import Ember from 'ember';
import InputHelper from 'ember-easy-form/helpers/input';
import SubmitHelper from 'ember-easy-form/helpers/submit';

var registered = false;

export default function() {
  if (!registered) {
    Ember.Handlebars.helpers['ember-input'] = Ember.Handlebars.helpers['input'];
    Ember.Handlebars.registerHelper('input', InputHelper);
    registered = true;
  }
}