Ember.Handlebars.registerHelper('button', function(value, options) {
  if (typeof(value) === 'object') {
    options = value;
    value = undefined;
  }
  options.hash.context = this;
  options.hash.value = value || 'Submit';
  return Ember.Handlebars.helpers.view.call(this, Ember.EasyForm.Button, options);
});
