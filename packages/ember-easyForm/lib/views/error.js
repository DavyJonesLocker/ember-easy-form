Ember.EasyForm.Error = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('errorClass'));
    this.set('templateName', this.getWrapperConfig('errorTemplate'));
    Ember.Binding.from('formForModel.errors.' + this.property).to('errors').connect(this);
  },
  errorText: Ember.computed.alias('errors.firstObject')
});
