Ember.EasyForm.Error = Ember.EasyForm.BaseView.extend({
  tagName: 'span',
  init: function() {
    var watchFunc;
    this._super();

    this.classNames.push(this.getWrapperConfig('errorClass'));

    // TODO: un-fuglify this
    watchFunc = {};
    watchFunc[''+this.property+'Watch'] = function() {
      if (typeof(this.get('controller.errors.'+this.property)) === 'string') {
        return (this.get('controller.errors.'+this.property));
      } else {
        return (this.get('controller.errors.'+this.property) || [])[0];
      }
    }.property('controller.errors.'+this.property);
    this.reopen(watchFunc);

    this.set('template', Ember.Handlebars.compile('{{view.'+this.property+'Watch}}'));
  }
});
