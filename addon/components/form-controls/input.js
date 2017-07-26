import Ember from 'ember'
import BaseComponent from './-base';

const {
  get,
  computed
} = Ember;

const types = [
  'color',
  'datetime-local',
  'datetime',
  'date',
  'time',
  'email',
  'file',
  'month',
  'number',
  'password',
  'range',
  'search',
  'tel',
  'text',
  'url',
  'week'
];

export default BaseComponent.extend({
  controlType: '-text-field',

  type: computed('property', function() {
    let property = get(this, 'property').toLowerCase();
    let type;

    for (let i = 0; i < types.length; i++) {
      if (property.indexOf(types[i]) > -1) {
        type = types[i];
        break;
      }
    }

    return type || 'text';
  })
});
