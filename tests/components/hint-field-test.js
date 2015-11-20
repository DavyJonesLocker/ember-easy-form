import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import config from 'ember-easy-form/config';

moduleForComponent('hint-field', 'Integration | Component | hint field', {
  integration: true
});

test('renders a hint field with custom text', function(assert) {
  this.render(hbs`{{hint-field "firstName" text="Some text"}}`);
  assert.equal(this.$().find('span.hint').text(), 'Some text');
});

test('uses the wrapper config', function(assert) {
  config.registerWrapper('my_wrapper', {hintClass: 'my-hint'});
  this.render(hbs`{{#form-for this wrapper="my_wrapper"}}{{hint-field "firstName" text="Some text"}}{{/form-for}}`);
  assert.ok(this.$().find('span.my-hint').get(0), 'hintClass not defined');
});

test('uses the defined template name', function(assert) {
  this.register('template:custom-hint-template', hbs`My custom hint | {{hintText}}`);
  config.registerWrapper('my_wrapper', {hintTemplate: 'custom-hint-template'});
  this.render(hbs`{{#form-for this wrapper="my_wrapper"}}{{hint-field "firstName" text="My text"}}{{/form-for}}`);
  assert.equal(this.$().text(), "My custom hint | My text");
});
