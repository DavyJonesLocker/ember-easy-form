Ember.Handlebars.registerHelper('error-field', function(property, options) {
  options = Ember.EasyForm.processOptions(property, options);

  if (options.hash.propertyBinding) {
    options.hash.property = Ember.Handlebars.get(this, options.hash.propertyBinding, options);
  }
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Error, options);
});
