import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';
import TextArea from 'ember-easy-form/views/text-area';
import TextField from 'ember-easy-form/views/text-field';

moduleForComponent('input-field', 'Integration | Component | input field', {
  integration: true,
  beforeEach: function() {
    var countries = Ember.A([{ id: 1, name: 'South Aftica' }, { id: 2, name: 'United States' }]);
    this.set('optionsForCountry', countries);
    this.setProperties({
      firstName: 'Brian',
      lastName: 'Cardarella',
      country: countries[1]
    });
  }
});

test('render text input and sets value propertly', function(assert) {
  this.render(hbs`{{input-field firstName}}`);
  assert.equal(this.$().find('input').attr('type'), 'text');
  assert.equal(this.$().find('input').val(), 'Brian');
});

test('allows setting of input attributes', function(assert) {
  this.render(hbs`{{input-field secret type="hidden"}}`);
  assert.equal(this.$().find('input').attr('type'), 'hidden');
});

test('auto sets input type to password if name includes password', function(assert) {
  this.render(hbs`{{input-field passwordConfirmation}}`);
  assert.equal(this.$().find('input').attr('type'), 'password');
});

test('auto sets input type to password if forced to password', function(assert) {
  this.render(hbs`{{input-field token as="password"}}`);
  assert.equal(this.$().find('input').attr('type'), 'password');
});

test('auto sets input type to url if name includes url', function(assert) {
  this.render(hbs`{{input-field url}}`);
  assert.equal(this.$().find('input').attr('type'), 'url');
});

test('auto sets input type to url if forced to url', function(assert) {
  this.render(hbs`{{input-field website as="url"}}`);
  assert.equal(this.$().find('input').attr('type'), 'url');
});

test('auto sets input type to color if name includes color', function(assert) {
  this.render(hbs`{{input-field color}}`);
  assert.equal(this.$().find('input').attr('type'), 'color');
});

test('auto sets input type to color if forced to color', function(assert) {
  this.render(hbs`{{input-field hue as="color"}}`);
  assert.equal(this.$().find('input').attr('type'), 'color');
});

test('auto sets input type to tel if name includes tel', function(assert) {
  this.render(hbs`{{input-field telephone}}`);
  assert.equal(this.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to tel if forced to tel', function(assert) {
  this.render(hbs `{{input-field phoneNumber as="tel"}}`);
  assert.equal(this.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to search if name includes search', function(assert) {
  this.render(hbs`{{input-field search}}`);
  assert.equal(this.$().find('input').attr('type'), 'search');
});

test('auto sets input type to search if forced to search', function(assert) {
  this.render(hbs`{{input-field query as="search"}}`);
  assert.equal(this.$().find('input').attr('type'), 'search');
});

test('auto sets input type to email if name includes email', function(assert) {
  this.render(hbs`{{input-field email}}`);
  assert.equal(this.$().find('input').attr('type'), 'email');
});

test('auto sets input type to email if forced to email', function(assert) {
  this.render(hbs`{{input-field receivedAt as="email"}}`);
  assert.equal(this.$().find('input').attr('type'), 'email');
});

test('auto sets input type to number if property meta attribute is a number', function(assert) {
  var ModelClass = Ember.Object.extend({
    age: Ember.computed(function() {
      return null;
    }).meta({ type: 'number' })
  });
  this.set('model', ModelClass.create());
  this.render(hbs`{{#form-for model}}{{input-field age}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'number');
});

test('auto sets input type to number if property is a number', function(assert) {
  this.set('age', 30);
  this.render(hbs`{{input-field age}}`);
  assert.equal(this.$().find('input').attr('type'), 'number');
});

test('auto sets input type to number if property is a number (in a form)', function(assert) {
  var model = {
    age: 30
  };
  this.set('model', model);
  this.render(hbs`{{#form-for model}}{{input-field age}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'number');
});

skip('auto sets input type to date if property meta attribute is a date', function(assert) {
  var ModelClass = Ember.Object.extend({
    birthday: Ember.computed(function() {
      return null;
    }).meta({ type: 'date' })
  });
  this.set('model', ModelClass.create());
  this.render(hbs`{{#form-for model}}{{input-field birthday}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'date');
});

test('auto sets input type to checkbox if forced to checkbox', function(assert) {
  this.set('alive', true);
  this.render(hbs`{{input-field alive as="checkbox"}}`);
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
  this.render(hbs`{{#form-for model}}{{input-field old}}{{/form-for}}`);
  assert.equal(this.$().find('input').attr('type'), 'checkbox');
});

test('auto sets input type to number if property is a number', function(assert) {
  this.set('age', 30);
  this.render(hbs`{{input-field age}}`);
  assert.equal(this.$().find('input').attr('type'), 'number');
});

test('does not fail if a controller content constructor does not respond to proto', function(assert) {
  this.set('content', []);
  this.render(hbs`{{input-field name}}`);
  assert.equal(this.$().find('input').attr('type'), 'text');
});

test('renders semantic form elements with text area', function(assert) {
  this.render(hbs`{{input-field firstName as="text"}}`);
  assert.equal(this.$().find('textarea').val(), 'Brian');
});

test('uses the custom input type when defined', function(assert) {
  config.registerInputType('my_input', TextArea);
  config.registerInputType('another_input', TextField);
  this.render(hbs`{{input-field firstName as="my_input"}}{{input-field lastName as="another_input"}}`);
  assert.equal(this.$().find('textarea').val(), 'Brian');
  assert.equal(this.$().find('input').val(), 'Cardarella');
});

test('generates a select input and options', function(assert) {
  this.render(hbs`{{input-field country as="select" collection="optionsForCountry"}}`);
  assert.equal(this.$().find('select').length, 1);
  assert.equal(this.$().find('select option').length, 2);
});

test('generates a select input and options with prompt', function(assert) {
  this.render(hbs`{{input-field country as="select" collection="optionsForCountry" prompt="Select Country"}}`);
  assert.equal(this.$().find('select').length, 1);
  assert.equal(this.$().find('select option').length, 3);
});

test('generates a select input with correct selection', function(assert) {
  this.render(hbs`{{input-field country as="select" collection="optionsForCountry" selection="country" optionValuePath="content.id" optionLabelPath="content.name"}}`);
  assert.ok(this.$().find('select option:selected').html().match(/United States/));
});

test('generates a select input with correct selection when no selection is specified', function(assert) {
  this.render(hbs`{{input-field country as="select" collection="optionsForCountry" optionValuePath="content.id" optionLabelPath="content.name"}}`);
  assert.ok(this.$().find('select option:selected').html().match(/United States/));
});

test('generates a select input correct value', function(assert) {
  this.render(hbs`{{input-field country as="select" collection="optionsForCountry" value="country.id" optionValuePath="content.id" optionLabelPath="content.name"}}`);
  assert.ok(this.$().find('select option:selected').html().match(/United States/));
});

skip('auto sets input type to date', function(assert) {
  this.render(hbs`{{input-field receivedAt as="date"}}`);
  assert.equal(this.$().find('input').attr('type'), 'date');
});

skip('auto sets input type to time', function(assert) {
  this.render(hbs`{{input-field receivedAt as="time"}}`);
  assert.equal(this.$().find('input').attr('type'), 'time');
});
