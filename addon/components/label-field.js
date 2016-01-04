import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';
import {humanize} from 'ember-easy-form/utilities';

var LabelFieldComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'label',
  isLabel: true,
  attributeBindings: ['for'],
  classNameBindings: ['wrapperConfig.labelClass'],
  layoutName: Ember.computed.oneWay('wrapperConfig.labelTemplate'),
  labelText: Ember.computed('text', 'property', 'propertyName', function() {
    return this.get('text') || humanize(this.get('property') || this.get('propertyName'));
  })
});

LabelFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default LabelFieldComponent;
