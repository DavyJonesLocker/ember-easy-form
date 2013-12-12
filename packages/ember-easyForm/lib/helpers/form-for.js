Ember.Handlebars.registerHelper('form-for', function(object, options) {
  options.data.keywords.formForModelPath = object;
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Form, options);
});
