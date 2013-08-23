Ember.Handlebars.registerHelper('errorField', function(property, options) {
  if (this.get('errors')) {
    options = Ember.EasyForm.processOptions(property, options);
    return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Error, options);
  }
});
