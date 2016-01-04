import Ember from 'ember';
import config from 'ember-easy-form/config';
import {getTypeForValue, assign} from 'ember-easy-form/utilities';

export default {
  setupState(state, env, scope, params, hash) {
    // Set all properties
    var options = env.hooks.getValue(hash.inputOptions);
    if (options) {
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          hash[prop] = options[prop];
        }
      }
    }
    hash.inputOptions = null;

    // Find the component name
    let componentName;
    let componentAs = env.hooks.getValue(hash.as);
    if (componentAs) {
      componentName = config.getInputType(componentAs);
      if (!componentName && componentAs === 'text') {
        componentName = 'input-text-area';
      }
      if (!componentName && componentAs === 'select') {
        Ember.Logger.warn('Input fields with as=\'select\' don\'t work anymore. You must register a custom input type.');
      }
    }
    if (!componentName) {
      componentName = 'input-text-field';
    }

    let propertyName = env.hooks.getValue(params[0]) || env.hooks.getValue(hash.property);
    let forcedType = env.hooks.getValue(hash.as) || env.hooks.getValue(hash.type);
    var viewWithModel = env.view.hasOwnProperty('model') ? env.view : env.view.nearestWithProperty('model');
    var model = viewWithModel ? Ember.get(viewWithModel, 'model') : null;
    var value = model ? Ember.get(model, propertyName) : null;
    var type = getTypeForValue(forcedType, propertyName, model, value);

    return assign({}, state, { componentName, type: type, property: propertyName });
  },

  render(morph, env, scope, params, hash, template, inverse, visitor) {
    // Use `state` on Ember < 2.2 and `getState()` on Ember >= 2.2
    var state = morph.getState ? morph.getState() : morph.state;
    hash.type = state.type;
    hash.property = state.property;
    if (!hash.name) {
      hash.name = state.property;
    }
    hash.isInput = true;
    env.hooks.component(morph, env, scope, state.componentName, params, hash, { default: template, inverse }, visitor);
  },

  rerender(...args) {
    this.render(...args);
  }
};
