Ember.EasyForm.Error = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('errorClass'));
    if (!this.textBinding && !this.hasOwnProperty('text')) {
      Ember.defineProperty(this, 'text', Ember.EasyForm.errorPropertyFor(this.property));
    }
  },
  render: function(buffer) {
    buffer.push(Handlebars.Utils.escapeExpression(this.get('text')));
  },
  textChanged: function() {
    this.rerender();
  }.observes('text')
});
