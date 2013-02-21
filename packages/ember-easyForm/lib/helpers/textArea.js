Ember.Handlebars.registerHelper('textArea', function(property, options) {
  options.hash.valueBinding = property;
  return Ember.Handlebars.helpers.view.call(this, Ember.TextArea, options);
});
