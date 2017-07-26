import Ember from 'ember';
import layout from '../../templates/components/form-controls/-base';

const {
  get,
  set,
  guidFor,
  computed,
  computed: { alias },
  String: { capitalize },
  Component
} = Ember;

let BaseComponent = Component.extend({
  layout,
  init() {
    let property = get(this, 'property');
    let value = alias(`subject.${property}`);
    set(this, 'value', value);
    return this._super(...arguments);
  },
  controlId: computed(function() {
    return guidFor({});
  }),
  label: computed(function() {
    let property = get(this, 'property');
    return capitalize(property);
  })
});

BaseComponent.reopenClass({
  positionalParams: ['property']
});

export default BaseComponent;
