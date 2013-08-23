Ember.Handlebars.registerHelper('labelField', function(property, options) {
  options = Ember.EasyForm.processOptions(property, options);
  options.hash.viewName = 'labelField-'+options.data.view.elementId;
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Label, options);
});
