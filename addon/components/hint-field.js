import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var HintFieldComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'span',
  classNameBindings: ['wrapperConfig.hintClass'],
  layoutName: Ember.computed.oneWay('wrapperConfig.hintTemplate'),
  hintText: Ember.computed.oneWay('text')
});

HintFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default HintFieldComponent;
