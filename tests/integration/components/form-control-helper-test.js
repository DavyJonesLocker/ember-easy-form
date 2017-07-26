import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-control-helper', 'Integration | Component | form control helper', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{form-control-helper text="foobar"}}`);

  assert.equal(this.$().text().trim(), 'foobar');

  // Template block usage:
  this.render(hbs`
    {{#form-control-helper}}
      template block text
    {{/form-control-helper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
