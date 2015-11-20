import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var FormSubmitComponent = Ember.Component.extend(WrapperMixin, {
  attributeBindings: ['type', 'value', 'disabled'],
  tagName: 'input',
  type: 'submit',
  classNameBindings: ['wrapperConfig.submitClass'],
  disabled: Ember.computed.not('formForModel.isValid'),
  value: Ember.computed('textValue', function() {
    return this.get('textValue') || 'Submit';
  })
});

FormSubmitComponent.reopenClass({
  positionalParams: ['textValue']
});

export default FormSubmitComponent;
