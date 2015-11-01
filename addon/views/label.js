import Ember from 'ember';
import BaseView from 'ember-easy-form/views/base';
import {humanize} from 'ember-easy-form/utilities';

export default BaseView.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  classNameBindings: ['wrapperConfig.labelClass'],
  labelText: Ember.computed('text', 'property', function() {
    return this.get('text') || humanize(this.get('property'));
  }),
  templateName: Ember.computed.oneWay('wrapperConfig.labelTemplate')
});
