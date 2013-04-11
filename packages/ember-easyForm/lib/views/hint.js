Ember.EasyForm.Hint = Ember.View.extend({
  tagName: 'span',
  classNames: ['hint'],
  init: function() {
    this._super();
    this.set('template', Ember.Handlebars.compile(this.get('text')));
  }
});