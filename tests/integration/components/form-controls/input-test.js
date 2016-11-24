import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-controls/input', 'Integration | Component | form-controls/input', {
  integration: true,

  beforeEach() {
    this.set('model', {
      name: 'Foo'
    });
  }
});

test('it by default renders input and associated label', function(assert) {
  this.render(hbs`{{form-controls/input "name" subject=model}}`);

  assert.equal(this.$('input').val(), 'Foo');
  assert.equal(this.$('label').text().trim(), 'Name')
  assert.equal(this.$('label').prop('for'), this.$('input').prop('id'));

  // does not render helper when no text provided
  assert.equal(this.$('div.form-control-helper').length, 0);
});

test('it allows for `label` override', function(assert) {
  this.render(hbs`{{form-controls/input "name" subject=model label="Your Name"}}`);

  assert.equal(this.$('label').text().trim(), 'Your Name')
});

test('it renders helper text', function(assert) {
  this.render(hbs`{{form-controls/input "name" subject=model helper="Do this, not that"}}`);

  assert.equal(this.$('div.form-control-helper').text().trim(), 'Do this, not that');
});

test('it can override the input type', function(assert) {
  this.render(hbs`{{form-controls/input "name" subject=model type="search"}}`);
  assert.equal(this.$('input').prop('type'), 'search');
});
