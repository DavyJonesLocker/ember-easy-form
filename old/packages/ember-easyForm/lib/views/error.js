Ember.EasyForm.Error = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  classNameBindings: ['wrapperConfig.errorClass'],
  init: function() {
    this._super();
    Ember.Binding.from('formForModel.errors.' + this.property).to('errors').connect(this);
  },
  templateName: Ember.computed.oneWay('wrapperConfig.errorTemplate'),
  errorText: Ember.computed.oneWay('errors.firstObject')
});
