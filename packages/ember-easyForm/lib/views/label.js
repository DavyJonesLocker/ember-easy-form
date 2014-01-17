Ember.EasyForm.Label = Ember.EasyForm.BaseView.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  classNameBindings: ['wrapperConfig.labelClass'],
  labelText: function() {
    return this.get('text') || Ember.EasyForm.humanize(this.get('property'));
  }.property('text', 'property'),
  templateName: Ember.computed.oneWay('wrapperConfig.labelTemplate')
});
