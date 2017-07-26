import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-controls/textarea', 'Integration | Component | form-controls/textarea', {
  integration: true,

  beforeEach() {
    this.set('model', {
      bio: 'Foo'
    });
  }
});

test('it by default renders textarea and associated label', function(assert) {
  this.render(hbs`{{form-controls/textarea "bio" subject=model}}`);

  assert.equal(this.$('textarea').val(), 'Foo');
  assert.equal(this.$('label').text().trim(), 'Bio')
  assert.equal(this.$('label').prop('for'), this.$('textarea').prop('id'));

  // does not render helper when no text provided
  assert.equal(this.$('div.form-control-helper').length, 0);
});

test('it allows for `label` override', function(assert) {
  this.render(hbs`{{form-controls/textarea "bio" subject=model label="Your Bio"}}`);

  assert.equal(this.$('label').text().trim(), 'Your Bio')
});

test('it renders helper text', function(assert) {
  this.render(hbs`{{form-controls/input "name" subject=model helper="Do this, not that"}}`);

  assert.equal(this.$('div.form-control-helper').text().trim(), 'Do this, not that');
});
