import Ember from 'ember';
import BaseView from 'ember-easy-form/views/base';

export default BaseView.extend({
  tagName: 'span',
  classNameBindings: ['wrapperConfig.errorClass'],
  init: function() {
    this._super();
    Ember.Binding.from('formForModel.errors.' + this.property).to('errors').connect(this);
  },
  templateName: Ember.computed.oneWay('wrapperConfig.errorTemplate'),
  errorText: Ember.computed('errors.[]', function() {
    var errors = this.get('errors');
    return errors ? errors[0] : null;
  })
});
