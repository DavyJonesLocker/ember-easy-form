import Ember from 'ember';

const ErrorsObject = Ember.Object.extend({
  unknownProperty: function(property) {
    this.set(property, Ember.A([]));
    return this.get(property);
  }
});

export default Ember.Object.extend({
  firstName: null,
  lastName: null,
  city: null,
  isValid: false,
  errors: null,

  init: function() {
    this._super();
    this.set('errors', ErrorsObject.create());
  },

  validate: function() {
    var errors = this.get('errors');
    var requiredFields = ['firstName', 'lastName'];
    var isValid = true;
    for (var i = 0; i < requiredFields.length; i++) {
      var field = requiredFields[i];
      if (Ember.isBlank(this.get(field))) {
        errors.get(field).pushObject('can\'t be blank');
        isValid = false;
      } else {
        errors.get(field).clear();
      }
    }
    this.set('isValid', isValid);
    return Ember.RSVP.resolve();
  },

  requiredFieldsChanged: Ember.observer('firstName', 'lastName', function() {
    this.validate();
  })

});