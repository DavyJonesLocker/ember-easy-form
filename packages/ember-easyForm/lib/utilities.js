Ember.EasyForm.errorPropertyFor = function(propertyName) {
  propertyName = 'context.errors.' + propertyName;
  return function() {
    var error = this.get(propertyName);
    if (!error || typeof(error) === 'string') {
      return error;
    } else {
      return (error || [])[0];
    }
  }.property(propertyName);
};

Ember.EasyForm.objectNameFor = function(object) {
  var constructorArray = object.constructor.toString().split('.');
  return constructorArray[constructorArray.length - 1].underscore();
};

Ember.EasyForm.processOptions = function(property, options) {
  if (options) {
    options.hash.property = property;
  } else {
    options = property;
  }

  return options;
};
