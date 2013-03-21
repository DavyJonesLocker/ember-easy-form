Ember.EasyForm.Label = Ember.View.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  init: function() {
    this._super();
    this.set('template', this.renderText());
  },
  renderText: function() {
    return Ember.Handlebars.compile(this.text || this.property.underscore().split('_').join(' ').capitalize());
  }
});
