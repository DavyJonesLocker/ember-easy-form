Ember.Handlebars.registerHelper('hint-field', function(property, options) {
  options = Ember.EasyForm.processOptions(property, options);

  if (options.hash.text || options.hash.textBinding) {
    return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Hint, options);
  }
});
