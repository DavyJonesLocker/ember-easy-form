Ember.EasyForm.processOptions = function(property, options) {
  if (options) {
    options.hash.property = property;
  } else {
    options = property;
  }

  return options;
};
