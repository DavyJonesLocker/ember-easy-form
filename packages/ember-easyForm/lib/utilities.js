Ember.EasyForm.humanize = function(string) {
  return string.underscore().split('_').join(' ').capitalize();
};

Ember.EasyForm.processOptions = function(property, options) {
  if (options) {
    options.hash.property = property;
  } else {
    options = property;
  }

  return options;
};
