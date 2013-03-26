Ember.Handlebars.registerHelper('inputField', function(property, options) {
  var context = this,
      propertyType = function(property) {
    try {
      return (context.get('content') || context).constructor.metaForProperty(property).type;
    } catch(e) {
      return null;
    }
  };

  options.hash.valueBinding = property;
  options.hash.viewName = 'inputField-'+options.data.view.elementId;

  if (options.hash.as === 'text') {
    return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.TextArea, options);
  } else {
    if (!options.hash.as) {
      if (property.match(/password/)) {
        options.hash.type = 'password';
      } else if (property.match(/email/)) {
        options.hash.type = 'email';
      } else if (property.match(/url/)) {
        options.hash.type = 'url';
      } else if (property.match(/color/)) {
        options.hash.type = 'color';
      } else if (property.match(/^tel/)) {
        options.hash.type = 'tel';
      } else if (property.match(/search/)) {
        options.hash.type = 'search';
      } else {
        if (propertyType(property) === 'number' || typeof(context.get(property)) === 'number') {
          options.hash.type = 'number';
        } else if (propertyType(property) === 'date' || (!Ember.isNone(context.get(property)) && context.get(property).constructor === Date)) {
          options.hash.type = 'date';
        }
      }
    } else {
      options.hash.type = options.hash.as;
    }
    return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.TextField, options);
  }
});
