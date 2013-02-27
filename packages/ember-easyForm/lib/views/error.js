Ember.EasyForm.Error = Ember.View.extend({
  tagName: 'span',
  classNames: ['error'],
  init: function() {
    var watchFunc;
    this._super();

    // TODO: un-fuglify this
    watchFunc = {};
    watchFunc[''+this.property+'Watch'] = function() {
      if (typeof(this.get('controller.errors.'+this.property)) === 'string') {
        return (this.get('controller.errors.'+this.property));
      } else {
        return (this.get('controller.errors.'+this.property) || [])[0];
      }
    }.property('controller.content.errors.'+this.property);
    this.reopen(watchFunc);

    this.set('template', Ember.Handlebars.compile('{{view.'+this.property+'Watch}}'));
  }
});
