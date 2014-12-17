Ember.Handlebars.registerHelper('form-for', function(object, options) {
  var parentView = options.data.view;

  Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Form, options);

  var newView = parentView._childViews[parentView._childViews.length - 1];

  newView._keywords.formForModelPath = object;

  return newView;
});
