Ember.Handlebars.registerHelper('formFor', function(object, options) {
  options.hash.contentBinding = object;
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Form, options);
});
