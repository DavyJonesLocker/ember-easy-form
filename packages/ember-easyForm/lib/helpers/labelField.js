Ember.Handlebars.registerHelper('labelField', function(property, options) {
  options.hash.property = property;
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Label, options);
});
