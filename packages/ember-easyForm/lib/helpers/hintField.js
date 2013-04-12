Ember.Handlebars.registerHelper('hintField', function(text, options) {
  if (options.hash.text){
    return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Hint, options);
  }
});