Ember.Handlebars.registerBoundHelper('formFor', function(object, options) {
  options.hash.context = object;
  return Ember.Handlebars.helpers.view.call(object, Ember.EasyForm.Form, options);
});
