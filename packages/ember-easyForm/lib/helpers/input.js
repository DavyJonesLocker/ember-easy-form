Ember.Handlebars.registerHelper('input', function(property, options) {
  options.hash.inputOptions = Ember.copy(options.hash);
  options.hash.property = property;
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Input, options);
});
