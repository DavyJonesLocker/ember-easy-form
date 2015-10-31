Ember.EasyForm.humanize = function(string) {
  return string.underscore().split('_').join(' ').capitalize();
};

Ember.EasyForm.eachTranslatedAttribute = function(object, fn) {
  var isTranslatedAttribute = /(.+)Translation$/,
      isTranslatedAttributeMatch;

  for (var key in object) {
    isTranslatedAttributeMatch = key.match(isTranslatedAttribute);
    if (isTranslatedAttributeMatch) {
      fn.call(object, isTranslatedAttributeMatch[1], Ember.I18n.t(object[key]));
    }
  }
};

Ember.EasyForm.processOptions = function(property, options) {
  if (options) {
    if (Ember.I18n) {
      var eachTranslatedAttribute = Ember.I18n.eachTranslatedAttribute || Ember.EasyForm.eachTranslatedAttribute;
      eachTranslatedAttribute(options.hash, function (attribute, translation) {
        options.hash[attribute] = translation;
        delete options.hash[attribute + 'Translation'];
      });
    }
    options.hash.property = property;
  } else {
    options = property;
  }

  return options;
};
