Ember.EasyForm.Hint = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('hintClass'));
    this.set('templateName', this.getWrapperConfig('hintTemplate'));
  },
  hintText: Ember.computed.alias('text')
});
