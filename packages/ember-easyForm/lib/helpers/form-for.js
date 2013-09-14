Ember.Handlebars.registerHelper('form-for', function(object, options) {
  options.hash.contentBinding = object;
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Form, options);
});
