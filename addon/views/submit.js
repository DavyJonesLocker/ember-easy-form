import Ember from 'ember';
import BaseView from 'ember-easy-form/views/base';

export default BaseView.extend({
  tagName: 'input',
  attributeBindings: ['type', 'value', 'disabled'],
  classNameBindings: ['wrapperConfig.buttonClass'],
  type: 'submit',
  disabled: Ember.computed('formForModel.isValid', function() {
    return !this.get('formForModel.isValid');
  }),
  init: function() {
    this._super();
    this.set('value', this.value);
  }
});
