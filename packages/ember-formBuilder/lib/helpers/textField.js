Ember.Handlebars.registerHelper('textField', function(property, options) {
  options.hash.valueBinding = property;
  return Ember.Handlebars.helpers.view.call(this, Ember.TextField, options);
});
