import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var FormButtonComponent = Ember.Component.extend(WrapperMixin, {
  attributeBindings: ['type', 'disabled'],
  tagName: 'button',
  layoutName: Ember.computed.oneWay('wrapperConfig.submitButtonTemplate'),
  type: 'submit',
  classNameBindings: ['wrapperConfig.submitClass'],
  disabled: Ember.computed.not('formForModel.isValid'),
  text: Ember.computed('textValue', function() {
    return this.get('textValue') || 'Submit';
  })
});

FormButtonComponent.reopenClass({
  positionalParams: ['textValue']
});

export default FormButtonComponent;
