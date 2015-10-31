Ember.EasyForm.Button = Ember.EasyForm.BaseView.extend({
  tagName: 'button',
  template: Ember.Handlebars.compile('{{text}}'),
  attributeBindings: ['type', 'disabled'],
  type: 'submit',
  disabled: function() {
    return !this.get('formForModel.isValid');
  }.property('formForModel.isValid'),
  init: function() {
    this._super();
    this.set('formForModel.text', this.value);
  }
});
