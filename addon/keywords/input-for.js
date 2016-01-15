import {assign} from 'ember-easy-form/utilities';
import {knownProperties} from 'ember-easy-form/components/internal-input-for';

export default function inputFor(morph, env, scope, originalParams, hash, template, inverse, visitor) {

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

  customHash.inputOptions = inputOptions;

  env.hooks.component(morph, env, scope, 'internal-input-for', originalParams, customHash, { default: template, inverse }, visitor);
  return true;
}