Ember.Handlebars.registerHelper('labelField', function(property, options) {
  options.hash.property = property;
  options.hash.viewName = 'labelField-'+options.data.view.elementId;
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Label, options);
});
