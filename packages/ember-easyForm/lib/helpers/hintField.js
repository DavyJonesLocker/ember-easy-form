Ember.Handlebars.registerHelper('hintField', function(text, options) {
  if (options.hash.text || options.hash.textBinding){
    return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Hint, options);
  }
});