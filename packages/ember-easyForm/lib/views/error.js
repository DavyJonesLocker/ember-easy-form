Ember.EasyForm.Error = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('errorClass'));
    Ember.Binding.from('context.errors.' + this.property).to('errors').connect(this);
  },
  templateName: 'easyForm/error'
});
