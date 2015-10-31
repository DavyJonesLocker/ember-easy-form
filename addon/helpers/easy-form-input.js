import InputView from 'ember-easy-form/views/input';
import {processOptions} from 'ember-easy-form/utilities';
import {viewHelper} from 'ember-easy-form/shims';

export default function(property, options) {
  options = processOptions(property, options);
  options.hash.isBlock = !!(options.fn);
  return viewHelper(this, InputView, options);
}
