import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | simple', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('displays form values', function(assert) {
  visit('/person');

  andThen(() => {
    assert.equal(find('.firstName > input').val(), 'Diogo');
    assert.equal(find('.lastName > input').val(), 'Mafra');
  });

  andThen(() => {
    fillIn('.firstName > input', 'Ozzy');
    fillIn('.lastName > input', 'Osbourne');
    click('input[type="submit"]');
  });

  andThen(() => {
    assert.equal(find('.bound-values .first-name').text(), 'Ozzy');
    assert.equal(find('.bound-values .last-name').text(), 'Osbourne');
    assert.equal(find('.form-submitted').text(), 'Submitted!!');
  });
});

test('displays errors', function(assert) {
  visit('/person');

  // Initial state
  andThen(() => {
    assert.equal(find('.firstName > input').val(), 'Diogo');
    assert.equal(find('.lastName > input').val(), 'Mafra');
  });

  // Empty name
  andThen(() => {
    fillIn('.firstName > input', '');
    triggerEvent('.firstName > input', 'blur');
  });
  andThen(() => {
    assert.equal(find('.firstName > .error').text(), 'can\'t be blank');
  });

  // Valid name
  andThen(() => {
    fillIn('.firstName > input', 'Test');
  });
  andThen(() => {
    assert.equal(find('.firstName > .error').text(), '');
  });

});
