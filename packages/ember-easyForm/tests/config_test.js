var originalRequire, originalRequireJs;

module('EasyForm config methods');

test('contains a default wrapper', function() {
  var wrapper = Ember.EasyForm.Config.getWrapper('default');
  ok(wrapper, 'The default wrapper could not be found');
  equal(wrapper.errorClass, 'error');
});

test('register custom wrappers', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {errorClass: 'my-error'});
  var wrapper = Ember.EasyForm.Config.getWrapper('my_wrapper');
  ok(wrapper, 'The custom wrapper could not be found');
  equal(wrapper.errorClass, 'my-error');
});

test('merge the default wrapper with the custom one', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {errorClass: 'my-error'});
  var wrapper = Ember.EasyForm.Config.getWrapper('my_wrapper');
  equal(wrapper.errorClass, 'my-error');
  equal(wrapper.hintClass, 'hint');
});

test('register custom input types', function() {
  Ember.EasyForm.Config.registerInputType('my_input', Ember.EasyForm.Select);
  Ember.EasyForm.Config.registerInputType('another_input', Ember.EasyForm.Label);

  var inputType = Ember.EasyForm.Config.getInputType('my_input');
  equal(inputType, Ember.EasyForm.Select);
  inputType = Ember.EasyForm.Config.getInputType('another_input');
  equal(inputType, Ember.EasyForm.Label);
});
