Ember.Handlebars.registerBoundHelper('formFor', function(object, options) {
  return Ember.Handlebars.helpers.view.call(object, Ember.EasyForm.Form, options);
});
