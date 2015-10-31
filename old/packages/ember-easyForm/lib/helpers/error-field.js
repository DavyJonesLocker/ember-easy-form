Ember.Handlebars.registerHelper('error-field', function(property, options) {
  options = Ember.EasyForm.processOptions(property, options);

  if (options.hash.propertyBinding) {
    options.hash.property = options.data.view.getStream(options.hash.propertyBinding).value();
  }
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Error, options);
});
