import Ember from 'ember';

const {underscore, capitalize} = Ember.String;

export function humanize(string) {
  return capitalize(underscore(string).split('_').join(' '));
}

function getPropertyType(model, key) {
  if (model && model.constructor.proto) {
    var proto = model.constructor.proto();
    var possibleDesc = proto[key];
    var desc = (possibleDesc !== null && typeof possibleDesc === 'object' && possibleDesc.isDescriptor) ? possibleDesc : undefined;
    if (desc && desc._meta) {
      return desc._meta.type;
    }
  }
  return null;
}

export function getTypeForValue(forcedType, property, model, value) {
  if (forcedType) {
    return forcedType;
  }

  if (!property) {
    return 'text';
  }

  if (property.match(/password/)) {
    return 'password';
  } else if (property.match(/email/)) {
    return 'email';
  } else if (property.match(/url/)) {
    return 'url';
  } else if (property.match(/color/)) {
    return 'color';
  } else if (property.match(/^tel/)) {
    return 'tel';
  } else if (property.match(/search/)) {
    return 'search';
  } else {
    if (getPropertyType(model, property) === 'number' || typeof(value) === 'number') {
      return 'number';
    } else if (getPropertyType(model, property) === 'date' || (!Ember.isNone(value) && value.constructor === Date)) {
      return 'date';
    } else if (getPropertyType(model, property) === 'boolean' || (!Ember.isNone(value) && value.constructor === Boolean)) {
      return 'checkbox';
    }
  }

  return 'text';
}

// TODO: Use Ember.assign when it's available
// https://github.com/emberjs/ember.js/pull/12303
export function assign(original, ...args) {
  for (let i = 0, l = args.length; i < l; i++) {
    let arg = args[i];
    if (!arg) { continue; }

    let updates = Object.keys(arg);

    for (let i = 0, l = updates.length; i < l; i++) {
      let prop = updates[i];
      original[prop] = arg[prop];
    }
  }

  return original;
}
