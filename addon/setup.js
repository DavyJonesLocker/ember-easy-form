import Ember from 'ember';
import InputHelper from 'ember-easy-form/helpers/input';
import EasyFormInputHelper from 'ember-easy-form/helpers/easy-form-input';
import SubmitHelper from 'ember-easy-form/helpers/submit';

var registered = false;

export default function() {
  if (!registered) {
    Ember.Handlebars.helpers['ember-input'] = Ember.Handlebars.helpers['input'];
    Ember.Handlebars.registerHelper('easy-form-input', EasyFormInputHelper);
    Ember.Handlebars.registerHelper('input', InputHelper);
    Ember.Handlebars.registerHelper('submit', SubmitHelper);
    registered = true;
  }
}