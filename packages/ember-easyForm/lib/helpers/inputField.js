Ember.Handlebars.registerHelper('inputField', function(property, options) {
  var context = this,
      propertyType = function(property) {
    try {
      return context.constructor.metaForProperty(property);
    } catch(e) {
      return null;
    }
  };

  options.hash.valueBinding = property;

  if (options.hash.as === 'text') {
    return Ember.Handlebars.helpers.view.call(context, Ember.TextArea, options);
  } else {
    if (!options.hash.type) {
      if (property.match(/password/)) {
        options.hash.type = 'password';
      } else if (property.match(/email/)) {
        options.hash.type = 'email';
      } else {
        if (propertyType(context, property) === 'number' || typeof(context.get(property)) === 'number') {
          options.hash.type = 'number';
        } else if (propertyType(context, property) === 'date' || (context.get(property) !== undefined && context.get(property).constructor === Date)) {
          options.hash.type = 'date';
        }
      }
    }
    return Ember.Handlebars.helpers.view.call(context, Ember.TextField, options);
  }
});
