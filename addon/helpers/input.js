import InputView from 'ember-easy-form/views/input';
import {processOptions} from 'ember-easy-form/utilities';
import {viewHelper, emberInputHelper} from 'ember-easy-form/shims';

export default function(property, options) {
  if (arguments.length === 1) {
    options = property;
    return emberInputHelper(this, options);
  }

  options = processOptions(property, options);
  options.hash.isBlock = !!(options.fn);
  return viewHelper(this, InputView, options);
}
