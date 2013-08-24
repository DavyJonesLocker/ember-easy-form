Ember.EasyForm.Submit = Ember.View.extend({
  tagName: 'input',
  attributeBindings: ['type', 'value', 'disabled'],
  type: 'submit',
  disabled: function() {
    return this.get('context.isInvalid');
  }.property('context.isInvalid'),
  init: function() {
    this._super();
    this.set('value', this.value);
  }
});
