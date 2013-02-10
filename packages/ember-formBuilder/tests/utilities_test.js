var model, property;

module('FormBuilder utility methods', {
  setup: function() {
    model = {
      constructor: {
        toString: function() {
          return 'App.TestUser';
        }
      }
    };
  }
});

test('gets the name of the object', function() {
  equal(Ember.FormBuilder.objectNameFor(model), 'test_user');
});
