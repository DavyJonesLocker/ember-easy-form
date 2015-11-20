import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';
import setup from 'ember-easy-form/setup';

moduleForComponent('input-field', 'Integration | Component | input field', {
  integration: true,
  beforeEach: function() {
    setup();

    this.set('model', {
      firstName: 'Brian',
      lastName: 'Cardarella'
    });
  }
});

test('render text input and sets value propertly', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "firstName"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'text');
  assert.equal(this.$().find('input').val(), 'Brian');
});

test('allows setting of input attributes', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "secret" type="hidden"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'hidden');
});

test('auto sets input type to password if name includes password', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "passwordConfirmation"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'password');
});

test('auto sets input type to password if forced to password', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "token" as="password"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'password');
});

test('auto sets input type to url if name includes url', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "url"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'url');
});

test('auto sets input type to url if forced to url', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "website" as="url"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'url');
});

test('auto sets input type to color if name includes color', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "color"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'color');
});

test('auto sets input type to color if forced to color', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "hue" as="color"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'color');
});

test('auto sets input type to tel if name includes tel', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "telephone"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to tel if forced to tel', function(assert) {
  this.render(hbs `{{#form-for model}}{{input-field "phoneNumber" as="tel"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to search if name includes search', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "search"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'search');
});

test('auto sets input type to search if forced to search', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "query" as="search"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'search');
});

test('auto sets input type to email if name includes email', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "email"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'email');
});

test('auto sets input type to email if forced to email', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "receivedAt" as="email"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'email');
});

test('auto sets input type to number if property meta attribute is a number', function(assert) {
  var ModelClass = Ember.Object.extend({
    age: Ember.computed(function() {
      return null;
    }).meta({ type: 'number' })
  });
  this.set('model', ModelClass.create());
  this.render(hbs`{{#form-for model}}{{input-field "age"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'number');
});

test('auto sets input type to number if property is a number (in a form)', function(assert) {
  var model = {
    age: 30
  };
  this.set('model', model);

  this.render(hbs`{{#form-for model}}{{input-field "age"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'number');
});

test('auto sets input type to date if property meta attribute is a date', function(assert) {
  var ModelClass = Ember.Object.extend({
    birthday: Ember.computed(function() {
      return null;
    }).meta({ type: 'date' })
  });
  this.set('model', ModelClass.create());
  this.render(hbs`{{#form-for model}}{{input-field "birthday"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'date');
});

test('auto sets input type to checkbox if forced to checkbox', function(assert) {
  this.set('model.alive', true);
  this.render(hbs`{{#form-for model}}{{input-field "alive" as="checkbox"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'checkbox');
  assert.equal(this.$().find('input').is(':checked'), true);
});

test('auto sets input type to checkbox if property meta attribute is a boolean', function(assert) {
  var ModelClass = Ember.Object.extend({
    old: Ember.computed(function() {
      return null;
    }).meta({ type: 'boolean' })
  });
  this.set('model', ModelClass.create());
  this.render(hbs`{{#form-for model}}{{input-field "old"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'checkbox');
});

test('auto sets input type to number if property is a number', function(assert) {
  this.set('model.age', 30);
  this.render(hbs`{{#form-for model}}{{input-field "age"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'number');
});

test('does not fail if a controller content constructor does not respond to proto', function(assert) {
  this.set('content', []);
  this.render(hbs`{{#form-for model}}{{input-field "name"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'text');
});

test('renders semantic form elements with text area', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "firstName" as="text"}}{{/form-for}}`);
  assert.equal(this.$().find('textarea').val(), 'Brian');
});

test('uses the custom input type when defined', function(assert) {
  config.registerInputType('my_input', 'input-text-area');
  config.registerInputType('another_input', 'input-text-field');
  this.render(hbs`{{#form-for model}}{{input-field "firstName" as="my_input"}}{{input-field "lastName" as="another_input"}}{{/form-for}}`);
  assert.equal(this.$().find('textarea').val(), 'Brian');
  assert.equal(this.$().find('input').val(), 'Cardarella');
});

skip('auto sets input type to date', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "receivedAt" as="date"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'date');
});

skip('auto sets input type to time', function(assert) {
  this.render(hbs`{{#form-for model}}{{input-field "receivedAt" as="time"}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'time');
});
