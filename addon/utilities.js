import Ember from 'ember';

const {underscore, capitalize} = Ember.String;

export function humanize(string) {
  return capitalize(underscore(string).split('_').join(' '));
}

export function eachTranslatedAttribute(object, fn) {
  var isTranslatedAttribute = /(.+)Translation$/,
      isTranslatedAttributeMatch;

  for (var key in object) {
    isTranslatedAttributeMatch = key.match(isTranslatedAttribute);
    if (isTranslatedAttributeMatch) {
      fn.call(object, isTranslatedAttributeMatch[1], Ember.I18n.t(object[key]));
    }
  }
}

export function processOptions(property, options) {
  if (options) {
    if (Ember.I18n) {
      var eachTranslatedAttributeFunction = Ember.I18n.eachTranslatedAttribute || eachTranslatedAttribute;
      eachTranslatedAttributeFunction(options.hash, function (attribute, translation) {
        options.hash[attribute] = translation;
        delete options.hash[attribute + 'Translation'];
      });
    }
    options.hash.property = property;
  } else {
    options = property;
  }

  return options;
}
