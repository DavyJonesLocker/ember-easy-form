import { module, test } from 'qunit';
import { humanize } from  'ember-easy-form/utilities';

module('Unit | utilities');

test('humanizes string', function(assert) {
  assert.equal(humanize('firstName'), 'First name');
});
