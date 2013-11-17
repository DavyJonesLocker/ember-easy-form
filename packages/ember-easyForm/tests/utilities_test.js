module('EasyForm utility methods', {

});

test('humanizes string', function() {
  equal(Ember.EasyForm.humanize("firstName"), 'First name');
});
