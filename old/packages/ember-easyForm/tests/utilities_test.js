module('EasyForm utility methods', {

});

test('humanizes string', function() {
  equal(Ember.EasyForm.humanize('firstName'), 'First name');
});

test('mutation of options - only property', function() {
  equal(Ember.EasyForm.processOptions('firstName'), 'firstName');
});

test('mutation of options - property and options', function() {
  var options = {hash: {placeholder: 'First name'}};
  deepEqual(Ember.EasyForm.processOptions('firstName', options), {hash: {placeholder: 'First name', property: 'firstName'}});
});

test('mutation of options - property and translation options (e.g. placeholderTranslation, labelTranslation, etc) without Ember.I18n', function() {
  var options = {hash: {placeholderTranslation: 'users.first_name'}};
  deepEqual(Ember.EasyForm.processOptions('firstName', options), {hash: {placeholderTranslation: 'users.first_name', property: 'firstName'}});
});

test('mutation of options - property and translation options (e.g. placeholderTranslation, labelTranslation, etc) with Ember.I18n', function() {
  Ember.I18n = {
    t: function(key) {
      return Ember.EasyForm.humanize(key);
    }
  };
  var options = {hash: {placeholderTranslation: 'users.first_name'}};
  deepEqual(Ember.EasyForm.processOptions('firstName', options), {hash: {placeholder: 'Users.first name', property: 'firstName'}});
  
  delete Ember.I18n;
});