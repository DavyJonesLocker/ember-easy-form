Ember.EasyForm.Button = Ember.View.extend({
  tagName: 'button',
  template: Ember.Handlebars.compile('{{text}}'),
  attributeBindings: ['type', 'disabled'],
  type: 'submit',
  disabled: function() {
    return !this.get('context.isValid');
  }.property('context.isValid'),
  init: function() {
    this._super();
    this.set('context.text', this.value);
  }
});
