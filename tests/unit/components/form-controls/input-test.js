import { moduleFor, test } from 'ember-qunit';

moduleFor('component:form-controls/input', 'Unit | Component | form-controls/input');

test('will derive allowed type from `property`', function(assert) {
  let component = this.subject();

  component.set('property', 'x-color-y');
  assert.equal(component.get('type'), 'color');

  component.set('property', 'x-COLOR-y');
  assert.equal(component.get('type'), 'color');

  component.set('property', 'x-datetime-local-y');
  assert.equal(component.get('type'), 'datetime-local');

  component.set('property', 'x-date-y');
  assert.equal(component.get('type'), 'date');

  component.set('property', 'x-time-y');
  assert.equal(component.get('type'), 'time');

  component.set('property', 'x-email-y');
  assert.equal(component.get('type'), 'email');

  component.set('property', 'x-file-y');
  assert.equal(component.get('type'), 'file');

  component.set('property', 'x-month-y');
  assert.equal(component.get('type'), 'month');

  component.set('property', 'x-number-y');
  assert.equal(component.get('type'), 'number');

  component.set('property', 'x-password-y');
  assert.equal(component.get('type'), 'password');

  component.set('property', 'x-range-y');
  assert.equal(component.get('type'), 'range');

  component.set('property', 'x-search-y');
  assert.equal(component.get('type'), 'search');

  component.set('property', 'x-tel-y');
  assert.equal(component.get('type'), 'tel');

  component.set('property', 'x-text-y');
  assert.equal(component.get('type'), 'text');

  component.set('property', 'x-url-y');
  assert.equal(component.get('type'), 'url');

  component.set('property', 'x-week-y');
  assert.equal(component.get('type'), 'week');
});

test('does not will derive disallowed type from `property`', function(assert) {
  let component = this.subject();

  component.set('property', 'x-checkbox-y');
  assert.equal(component.get('type'), 'text');

  component.set('property', 'x-hidden-y');
  assert.equal(component.get('type'), 'text');

  component.set('property', 'x-image-y');
  assert.equal(component.get('type'), 'text');

  component.set('property', 'x-reset-y');
  assert.equal(component.get('type'), 'text');

  component.set('property', 'x-submit-y');
  assert.equal(component.get('type'), 'text');
});
