Ember.EasyForm.Hint = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('hintClass'));
  },
  render: function(buffer) {
    buffer.push(Handlebars.Utils.escapeExpression(this.get('text')));
  },
  textChanged: function() {
    this.rerender();
  }.observes('text')
});
