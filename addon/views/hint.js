import Ember from 'ember';
import BaseView from 'ember-easy-form/views/base';

export default BaseView.extend({
  tagName: 'span',
  classNameBindings: ['wrapperConfig.hintClass'],
  templateName: Ember.computed.oneWay('wrapperConfig.hintTemplate'),
  hintText: Ember.computed.oneWay('text')
});
