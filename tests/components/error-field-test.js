import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';

const  ErrorsObject = Ember.Object.extend({
  unknownProperty: function(property) {
    this.set(property, Ember.A([]));
    return this.get(property);
  }
});

moduleForComponent('error-field', 'Integration | Component | error field', {
  integration: true
});

test('error helper should bind to first error message in array', function(assert) {
  this.set('errors', ErrorsObject.create());
  this.render(hbs`{{error-field firstName}}`);
  assert.equal(this.$().find('span.error').text(), '');
  Ember.run(() => {
    this.get('errors.firstName').pushObject("can't be blank");
  });
  assert.equal(this.$().find('span.error').text(), "can't be blank");
  Ember.run(() => {
    this.get('errors.firstName').unshiftObject('is invalid');
  });
  assert.equal(this.$().find('span.error').text(), 'is invalid');
  Ember.run(() => {
    this.get('errors.firstName').clear();
  });
  assert.equal(this.$().find('span.error').text(), '');
});

test('uses the wrapper config', function(assert) {
  var model = Ember.Object.create({
    errors: ErrorsObject.create()
  });
  this.set('model', model);
  config.registerWrapper('my_wrapper', {errorClass: 'my-error'});
  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{error-field firstName}}{{/form-for}}`);
  Ember.run(() => {
    model.get('errors').set('firstName', ["can't be blank"]);
  });
  assert.ok(this.$().find('span.my-error').get(0), 'errorClass not defined');
});

test('uses the defined template name', function(assert) {
  var model = Ember.Object.create({
    errors: ErrorsObject.create()
  });
  this.set('model', model);
  this.container.register('template:custom-error-template', hbs`My custom error | {{view.errorText}}`);
  config.registerWrapper('my_wrapper', {errorTemplate: 'custom-error-template'});

  this.render(hbs`{{#form-for model wrapper="my_wrapper"}}{{error-field firstName}}{{/form-for}}`);
  Ember.run(() => {
    model.get('errors').set('firstName', ["can't be blank"]);
  });
  assert.equal(this.$().text(), "My custom error | can't be blank");
});
