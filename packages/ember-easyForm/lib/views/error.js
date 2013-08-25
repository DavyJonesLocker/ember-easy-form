Ember.EasyForm.Error = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('errorClass'));
    this.set('errors', this.get('context.errors.' + this.property));
  },
  templateName: 'easy_form/error'
});
