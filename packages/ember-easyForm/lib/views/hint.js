Ember.EasyForm.Hint = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('hintClass'));
    this.set('template', Ember.Handlebars.compile('{{view.text}}'));
  }
});