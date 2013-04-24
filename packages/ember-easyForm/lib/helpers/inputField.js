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

  if (options.hash.inputConfig) {
    var configs = options.hash.inputConfig.split(';');
    var i = configs.length;
    while(i--) {
      var config = configs[i].split(':');
      options.hash[config[0]] = config[1];
    }
  }

  if (options.hash.as === 'text') {
    return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.TextArea, options);
  } else if (options.hash.as === 'select') {
    delete(options.hash.valueBinding);

    options.hash.contentBinding   = options.hash.collection;
    options.hash.selectionBinding = options.hash.selection;
    options.hash.valueBinding     = options.hash.value;

    return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.Select, options);
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
        } else if (propertyType(property) === 'boolean' || (!Ember.isNone(context.get(property)) && context.get(property).constructor === Boolean)) {
          options.hash.checkedBinding = property;
          return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.Checkbox, options);
        }
      }
    } else {
      var inputType = Ember.EasyForm.Config.getInputType(options.hash.as);
      if (inputType) {
        options.hash.property = property;
        return Ember.Handlebars.helpers.view.call(context, inputType, options);
      }

      options.hash.type = options.hash.as;
    }
    return Ember.Handlebars.helpers.view.call(context, Ember.EasyForm.TextField, options);
  }
});
