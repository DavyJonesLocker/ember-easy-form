Ember.EasyForm.Error = Ember.View.extend({
  tagName: 'span',
  classNames: ['error'],
  init: function() {
    this._super();
    this.set('template', Ember.Handlebars.compile('{{errors.'+this.property+'}}'));
  }
});
