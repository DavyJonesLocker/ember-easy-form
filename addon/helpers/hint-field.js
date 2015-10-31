import HintView from 'ember-easy-form/views/hint';
import {processOptions} from 'ember-easy-form/utilities';
import {viewHelper} from 'ember-easy-form/shims';

export default function(property, options) {
  options = processOptions(property, options);

  if (options.hash.text || options.hash.textBinding) {
    return viewHelper(this, HintView, options);
  }
}
