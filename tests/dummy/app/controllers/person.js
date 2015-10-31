import Ember from 'ember';

export default Ember.Controller.extend({
  submitted: false,
  welcomeMessage: 'Hello',
  cities: Ember.A([
    'Boston',
    'Ocala',
    'Portland'
  ]),
  city: 'Boston'
});