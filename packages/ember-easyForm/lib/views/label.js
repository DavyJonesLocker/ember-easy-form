Ember.EasyForm.Label = Ember.EasyForm.BaseView.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  labelText: function() {
    return this.get('text') || Ember.EasyForm.humanize(this.get('property'));
  }.property('text', 'property'),
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('labelClass'));
    this.set('templateName', this.getWrapperConfig('labelTemplate'));
  }
});
