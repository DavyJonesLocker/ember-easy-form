import {assign} from 'ember-easy-form/utilities';
import {knownProperties} from 'ember-easy-form/components/internal-input-for';

export default {
  setupState(state, env, scope, params, hash) {
    // Move all values to the `inputOptions` hash, except the ones we use in the `internal-input-for`
    let customHash = {};
    let inputOptions = assign({}, hash);
    for(let i=0; i<knownProperties.length; i++) {
      const key = knownProperties[i];
      if (inputOptions.hasOwnProperty(key)) {
        customHash[key] = inputOptions[key];
        delete inputOptions[key];
      }
    }

    customHash.savedInputOptions = inputOptions;
    return assign({}, state, { customHash: customHash });
  },

  render(morph, env, scope, params, hash, template, inverse, visitor) {
    // Use `state` on Ember < 2.2 and `getState()` on Ember >= 2.2
    var state = morph.getState ? morph.getState() : morph.state;
    env.hooks.component(morph, env, scope, 'internal-input-for', params, state.customHash, { default: template, inverse }, visitor);
  },

  rerender(...args) {
    this.render(...args);
  }
};
