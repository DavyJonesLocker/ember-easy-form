import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';
import setup from 'ember-easy-form/setup';

const ErrorsObject = Ember.Object.extend({
  unknownProperty: function(property) {
    this.set(property, Ember.A([]));
    return this.get(property);
  }
});

function getView(context, name) {
  return context.container.lookup('-view-registry:main')[name];
}

function findComponent(context, id) {
  var registry = context.container.lookup('-view-registry:main') || Ember.View.views;
  return registry[id];
}

moduleForComponent('input-for', 'Integration | Component | input-for', {
  integration: true,
  beforeEach: function() {
    setup();
    this.set('model', {
      firstName: 'Brian',
      lastName: 'Cardarella',
      errors: ErrorsObject.create()
    });
  }
});

test('renders semantic form elements', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().find('label').text(), 'First name');
  assert.equal(this.$().find('input').val(), 'Brian');
  assert.equal(this.$().find('input').attr('type'), 'text');
});

test('does not render error tag when context does not have errors object', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));
  Ember.run(() => {
    this.$('input:first').blur();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));
});

test('renders error for invalid data', function(assert) {
  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
  });

  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    getView(this, this.$().find('.firstName').attr('id')).input();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    this.$('input:first').blur();
  });
  assert.ok(this.$().find('div.fieldWithErrors').get(0));
  assert.equal(this.$().find('span.error').text(), "can't be blank");

  Ember.run(() => {
    this.get('model.errors.firstName').clear();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    getView(this, this.$().find('.firstName').attr('id')).focusOut();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
    getView(this, this.$().find('.firstName').attr('id')).input();
  });
  assert.ok(!this.$().find('div.fieldWithErrors').get(0));
  assert.ok(!this.$().find('span.error').get(0));

  Ember.run(() => {
    getView(this, this.$().find('.firstName').attr('id')).focusOut();
  });
  assert.ok(this.$().find('div.fieldWithErrors').get(0));
  assert.equal(this.$().find('span.error').text(), "can't be blank");
});

test('renders errors properly with dependent keys', function(assert) {
  this.set('model._dependentValidationKeys', {
    passwordConfirmation: ['password']
  });

  Ember.run(() => {
    this.get('model.errors.passwordConfirmation').pushObject("does not match password");
  });
  this.render(hbs`{{#form-for model}}{{input-for "password"}}{{input-for "passwordConfirmation"}}{{/form-for}}`);
  assert.ok(!this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  assert.ok(!this.$().find('.passwordConfirmation').find('span.error').get(0));

  Ember.run(() => {
    findComponent(this, this.$().find('.password').attr('id')).input();
  });
  assert.ok(!this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  assert.ok(!this.$().find('.passwordConfirmation').find('span.error').get(0));

  Ember.run(() => {
    findComponent(this, this.$().find('.password').attr('id')).focusOut();
  });
  assert.ok(!this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  assert.ok(!this.$().find('.passwordConfirmation').find('span.error').get(0));

  Ember.run(() => {
    findComponent(this, this.$().find('.passwordConfirmation').attr('id')).focusOut();
  });
  assert.ok(this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  assert.ok(this.$().find('.passwordConfirmation').find('span.error').get(0));

  Ember.run(() => {
    this.get('model.errors.passwordConfirmation').clear();
    findComponent(this, this.$().find('.passwordConfirmation').attr('id')).focusOut();
  });
  assert.ok(!this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  assert.ok(!this.$().find('.passwordConfirmation').find('span.error').get(0));

  Ember.run(() => {
    this.get('model.errors.passwordConfirmation').pushObject("does not match password");
    findComponent(this, this.$().find('.password').attr('id')).focusOut();
    findComponent(this, this.$().find('.passwordConfirmation').attr('id')).focusOut();
  });

  assert.ok(this.$().find('.passwordConfirmation').hasClass('fieldWithErrors'));
  assert.ok(this.$().find('.passwordConfirmation').find('span.error').get(0));
});

test('allows label text to be set', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" label="Your First Name"}}{{/form-for}}`);
  assert.equal(this.$().find('label').text(), 'Your First Name');
});

test('allows hint text to be set', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" hint="My hint text"}}{{/form-for}}`);
  assert.equal(this.$().find('span.hint').text(), 'My hint text');
});

test('allows to define custom properties of the input field', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" as='text' class="something" rows=2}}{{/form-for}}`);
  assert.equal(this.$().find('textarea.something').val(), 'Brian');
  assert.equal(this.$().find('textarea').prop('rows'), 2);
});

test('allows to define custom properties of the input field using dynamic values', function(assert) {
  this.set('rowCount', 1);
  this.render(hbs`{{#form-for model}}{{input-for "firstName" as='text' rows=rowCount}}{{/form-for}}`);
  assert.equal(this.$().find('textarea').prop('rows'), 1);
  this.set('rowCount', 2);
  assert.equal(this.$().find('textarea').prop('rows'), 2);
});

test('can specify a property outside of the model if the value property is defined', function(assert) {
  this.set('someProperty', 'My name');
  this.render(hbs`{{#form-for model}}{{input-for "something" value=someProperty}}{{/form-for}}`);
  assert.equal(this.$().find('input.something').val(), 'My name');
  this.set('someProperty', 'Another name');
  assert.equal(this.$().find('input.something').val(), 'Another name');
});

test('does not show hint span when there is no hint', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().find('span.hint').length, 0);
});

test('block form for input', function(assert) {
  this.render(hbs`{{#form-for model}}{{#input-for "firstName"}}{{label-field "firstName"}}{{input-field "firstName"}}{{error-field "firstName"}}{{/input-for}}{{/form-for}}`);

  var input = this.$().find('input');
  var label = this.$().find('label');

  assert.equal(label.text(), 'First name');
  assert.equal(input.val(), 'Brian');
  assert.equal(input.attr('type'), 'text');
  assert.equal(label.prop('for'), input.prop('id'));
});

test('block form for input without label', function(assert) {
  this.render(hbs`{{#form-for model}}{{#input-for "firstName"}}{{input-field "firstName"}}{{/input-for}}{{/form-for}}`);
  assert.equal(this.$().find('input').val(), 'Brian');
  assert.equal(this.$().find('input').attr('type'), 'text');
});

test('sets input attributes property', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "receiveAt" as="email" placeholder="Your email" disabled=true}}{{/form-for}}`);
  var input = this.$().find('input');
  assert.equal(input.prop('type'), 'email');
  assert.equal(input.prop('placeholder'), 'Your email');
  assert.equal(input.prop('disabled'), true);
});

test('binds label to input field', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  var input = this.$().find('input');
  var label = this.$().find('label');
  assert.equal(input.prop('id'), label.prop('for'));
});

test('binds label to input field across re-rendering', function(assert) {
  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
  });
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  var initialInput = this.$().find('input');
  var initialLabel = this.$().find('label');
  assert.equal(initialInput.prop('id'), initialLabel.prop('for'));
  Ember.run(() => {
    this.$().find('input').blur();
  });
  var reRenderedInput = this.$().find('input');
  var reRenderedLabel = this.$().find('label');
  assert.notEqual(initialInput.prop('id'), reRenderedInput.prop('id'));
  assert.equal(reRenderedInput.prop('id'), reRenderedLabel.prop('for'));
});

test('uses the wrapper config', function(assert) {
  config.registerWrapper('my_wrapper', {inputClass: 'my-input', errorClass: 'my-error', fieldErrorClass: 'my-fieldWithErrors'});

  Ember.run(() => {
    this.get('model.errors.firstName').pushObject("can't be blank");
  });
  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{input-for "firstName"}}{{/form-for}}`);
  Ember.run(() => {
    this.$().find('input').blur();
  });
  assert.ok(this.$().find('div.my-input').get(0), 'inputClass not defined');
  assert.ok(this.$().find('div.my-fieldWithErrors').get(0), 'fieldErrorClass not defined');
  assert.ok(this.$().find('span.my-error').get(0), 'errorClass not defined');
});

test('uses the defined template name', function(assert) {
  this.register('template:custom-input-template', hbs`My custom template | {{label-field property=propertyName}}`);
  config.registerWrapper('my_wrapper', {inputTemplate: 'custom-input-template'});

  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().text(), 'My custom template | First name');
});

test('sets input attributes property as bindings', function(assert) {
  this.setProperties({
    placeholder: 'The placeholder',
    label: 'My label',
    hint: 'Some hint'
  });
  this.render(hbs`{{#form-for model}}{{input-for "firstName" placeholder=placeholder label=label hint=hint}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('placeholder'), 'The placeholder');
  assert.equal(this.$().find('label').text(), 'My label');
  assert.equal(this.$().find('.hint').text(), 'Some hint');

  Ember.run(() => {
    this.setProperties({
      placeholder: 'Write your first name',
      label: 'First name (not a last name)',
      hint: 'Usually different than your last name'
    });
  });

  assert.equal(this.$().find('input').prop('placeholder'), 'Write your first name');
  assert.equal(this.$().find('label').text(), 'First name (not a last name)');
  assert.equal(this.$().find('.hint').text(), 'Usually different than your last name');
});

test('defaults the name property', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('name'), "firstName");
});

test('allows specifying the name property', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" name="some-other-name"}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('name'), "some-other-name");
});

test('scopes property lookup to model declared in form-for', function(assert){
  this.set('someOtherModel', Ember.Object.create({firstName: 'Robert'}));

  this.render(hbs`{{#form-for someOtherModel}}{{input-for "firstName"}}{{/form-for}}`);
  assert.equal(this.$().find('input').val(), "Robert");
});

skip('sets input as="date" attributes properly', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "receiveAt" as="date"}}{{/form-for}}`);
  assert.equal(this.$().find('input').prop('type'), "date");
});

test('adds a class to the parent div for the property name', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-for "firstName" labelClass="blammo"}}{{/form-for}}`);
  assert.equal(this.$().find('div.input.firstName input').val(), 'Brian');
});
