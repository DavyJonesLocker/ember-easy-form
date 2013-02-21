var model, property;

module('EasyForm utility methods', {
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
  equal(Ember.EasyForm.objectNameFor(model), 'test_user');
});
