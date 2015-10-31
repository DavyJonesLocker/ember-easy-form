import Ember from 'ember';
import Person from 'dummy/models/person';

export default Ember.Route.extend({
  model: function() {
    return Person.create({
      firstName: 'Diogo',
      lastName: 'Mafra'
    });
  },
  setupController: function(controller) {
    this._super(...arguments);
    controller.set('submitted', false);
  },
  actions: {
    submit: function() {
      this.controller.set('submitted', true);
    }
  }
});
