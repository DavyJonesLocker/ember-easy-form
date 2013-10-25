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

module('EasyForm template configuration', {
  setup: function(){
    originalRequire   = window.require;
    originalRequireJs = window.requirejs;
  },
  teardown: function(){
    Ember.TEMPLATES  = {};
    window.require   = originalRequire;
    window.requirejs = originalRequireJs;
  }
});

test('register custom templates on Ember.TEMPLATES', function(){
  var expected = Ember.TEMPLATES['easyForm/input'] = 'foobar';
  var actual   = Ember.EasyForm.Config.getTemplate('easyForm/input');

  equal(actual, expected, 'templates should be looked up on Ember.TEMPLATES');
});

test('register custom templates on requirejs._eak_seen', function(){
  expect(2);

  window.requirejs = {_eak_seen: {'easyForm/input': 'foobar'}};
  window.require = function(moduleName){
    equal(moduleName, 'appkit/templates/easyForm/input', 'the proper module was looked up');
    return 'custom template';
  };

  var actual   = Ember.EasyForm.Config.getTemplate('easyForm/input');

  equal(actual, 'custom template', 'templates should be looked up on _eak_seen');
});

test('register custom templates on requirejs._eak_seen with a custom module prefix', function(){
  expect(2);

  window.requirejs = {_eak_seen: {'easyForm/input': 'foobar'}};
  window.require = function(moduleName){
    equal(moduleName, 'random/templates/easyForm/input', 'the proper module was looked up');
    return 'custom template';
  };

  Ember.EasyForm.Config.modulePrefix = 'random';
  var actual   = Ember.EasyForm.Config.getTemplate('easyForm/input');

  equal(actual, 'custom template', 'templates should be looked up on _eak_seen');
});
