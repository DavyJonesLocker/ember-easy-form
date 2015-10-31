import Ember from 'ember';
import BaseView from 'ember-easy-form/views/base';

export default BaseView.extend({
  tagName: 'button',
  templateName: 'components/easy-form/button',
  attributeBindings: ['type', 'disabled'],
  type: 'submit',
  disabled: Ember.computed('formForModel.isValid', function() {
    return !this.get('formForModel.isValid');
  }),
  init: function() {
    this._super();
    this.set('formForModel.text', this.value);
  }
});
