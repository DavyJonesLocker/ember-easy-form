Ember.Handlebars.registerHelper('error', function(property, options) {
  if (this.errors) {
    options.hash.context = this;
    options.hash.property = property;
    return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Error, options);
  }
});
