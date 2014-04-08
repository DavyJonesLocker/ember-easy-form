Ember.EasyForm.Submit = Ember.EasyForm.BaseView.extend({
  tagName: 'input',
  attributeBindings: ['type', 'value', 'disabled'],
  classNameBindings: ['wrapperConfig.buttonClass'],
  type: 'submit',
  disabled: function() {
    return !this.get('formForModel.isValid');
  }.property('formForModel.isValid'),
  init: function() {
    this._super();
    this.set('value', this.value);
  }
});
