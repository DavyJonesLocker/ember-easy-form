import config from 'ember-easy-form/config';
import { module, test } from 'qunit';

module('Unit | config');

test('contains a default wrapper', function(assert) {
  var wrapper = config.getWrapper('default');
  assert.ok(wrapper, 'The default wrapper could not be found');
  assert.equal(wrapper.errorClass, 'error');
});

test('register custom wrappers', function(assert) {
  config.registerWrapper('my_wrapper', {errorClass: 'my-error'});
  var wrapper = config.getWrapper('my_wrapper');
  assert.ok(wrapper, 'The custom wrapper could not be found');
  assert.equal(wrapper.errorClass, 'my-error');
});

test('merge the default wrapper with the custom one', function(assert) {
  config.registerWrapper('my_wrapper', {errorClass: 'my-error'});
  var wrapper = config.getWrapper('my_wrapper');
  assert.equal(wrapper.errorClass, 'my-error');
  assert.equal(wrapper.hintClass, 'hint');
});

test('register custom input types', function(assert) {
  var myInputComponent = {myInput: true};
  var anotherInputComponent = {anotherInput: true};
  config.registerInputType('my_input', myInputComponent);
  config.registerInputType('another_input', anotherInputComponent);

  var inputType = config.getInputType('my_input');
  assert.equal(inputType, myInputComponent);
  inputType = config.getInputType('another_input');
  assert.equal(inputType, anotherInputComponent);
});
