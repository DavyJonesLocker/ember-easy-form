Ember.EasyForm.Label = Ember.EasyForm.BaseView.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('labelClass'));
    this.set('template', this.renderText());
  },
  renderText: function() {
    return Ember.Handlebars.compile(this.text || this.property.underscore().split('_').join(' ').capitalize());
  }
});
