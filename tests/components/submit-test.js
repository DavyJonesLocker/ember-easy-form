import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import setup from 'ember-easy-form/setup';

moduleForComponent('submit-button', 'Integration | Component | submit button', {
  integration: true,
  beforeEach: function() {
    setup();
  }
});

test('renders submit button', function(assert) {
  this.render(hbs`{{submit}}`);
  assert.equal(this.$().find('input').prop('value'), 'Submit');
  assert.equal(this.$().find('input').prop('type'), 'submit');
});

test('renders as button', function(assert) {
  this.render(hbs`{{submit as="button"}}`);
  assert.equal(this.$().find('button').text(), 'Submit');
  assert.equal(this.$().find('button').prop('type'), 'submit');
});

test('has custom value as button', function(assert) {
  this.render(hbs`{{submit "Create" as="button"}}`);
  assert.equal(this.$().find('button').text(), 'Create');
});

test('submit as button disabled state is bound to models valid state', function(assert) {
  Ember.run(() => {
    this.set('isValid', false);
  });
  this.render(hbs`{{submit as="button"}}`);
  assert.equal(this.$().find('button').prop('disabled'), true);
  Ember.run(() => {
    this.set('isValid', true);
  });
  assert.equal(this.$().find('button').prop('disabled'), false);
});

test('custom value', function(assert) {
  this.render(hbs`{{submit "Create"}}`);
  assert.equal(this.$().find('input').prop('value'), 'Create');
});

test('submit button disabled state is bound to models valid state', function(assert) {
  Ember.run(() => {
    this.set('isValid', false);
  });
  this.render(hbs`{{submit}}`);
  assert.equal(this.$().find('input').prop('disabled'), true);
  Ember.run(() => {
    this.set('isValid', true);
  });
  assert.equal(this.$().find('input').prop('disabled'), false);
});
