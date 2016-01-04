import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';

moduleForComponent('label-field', 'Integration | Component | label field', {
  integration: true
});

test('renders a label field', function(assert) {
  this.render(hbs`{{label-field "firstName"}}`);
  assert.equal(this.$().find('label').text(), 'First name');
});

test('renders a label field with custom text', function(assert) {
  this.render(hbs`{{label-field "firstName" text="Your first name"}}`);
  assert.equal(this.$().find('label').text(), 'Your first name');
});

test('uses the wrapper config', function(assert) {
  config.registerWrapper('my_wrapper', {labelClass: 'my-label'});
  this.render(hbs`{{#form-for this wrapper="my_wrapper"}}{{label-field "firstName"}}{{/form-for}}`);
  assert.ok(this.$().find('label.my-label').get(0), 'labelClass not defined');
});

test('uses the defined template name', function(assert) {
  this.register('template:custom-label-template', hbs`My custom label | {{labelText}}`);
  config.registerWrapper('my_wrapper', {labelTemplate: 'custom-label-template'});
  this.render(hbs`{{#form-for this wrapper="my_wrapper"}}{{label-field "firstName"}}{{/form-for}}`);
  assert.equal(this.$().text(), "My custom label | First name");
});
