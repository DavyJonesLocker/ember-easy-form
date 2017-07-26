import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn } from '../../helpers/actions';

moduleForComponent('form-for', 'Integration | Component | form for', {
  integration: true,

  beforeEach() {
    this.set('model', {
      name: 'foo'
    });
  }
});

test('it renders a form', function(assert) {
  this.render(hbs`
    {{#form-for model}}
    {{/form-for}}
  `);

  assert.ok(this.$('form.easy-form').length, 1);
});

test('it does not accept in-line style', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{form-for model}}`);
  }, 'cannot take inline, only block');
});

test('it will not accept without the `subject` being set', function(assert) {
  assert.expect(2);

  assert.throws(() => {
    this.render(hbs`
      {{#form-for}}
      {{/form-for}}
    `);
  }, 'subject must be passed to `form-for` as either positional param or explicit param');

  assert.throws(() => {
    this.render(hbs`
      {{#form-for foobar}}
      {{/form-for}}
    `);
  }, 'subject must be passed to `form-for` as either positional param or explicit param');

  try {
    this.render(hbs`
      {{#form-for model}}
      {{/form-for}}
    `);
  } catch(err) {
    assert.notOk(true, 'did not expect an error to be thrown');
  }
});

test('can render an input', function(assert) {
  this.render(hbs`
    {{#form-for model as |f|}}
      {{f.input "name"}}
      {{f.textarea "bio"}}
    {{/form-for}}
  `);

  fillIn(this, 'form input', 'Brian');
  fillIn(this, 'form textarea', 'CEO of DockYard');

  assert.equal(this.get('model.name'), 'Brian');
  assert.equal(this.get('model.bio'), 'CEO of DockYard');
});
