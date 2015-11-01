import ErrorView from 'ember-easy-form/views/error';
import {processOptions} from 'ember-easy-form/utilities';
import {viewHelper} from 'ember-easy-form/shims';

export default function(property, options) {
  options = processOptions(property, options);

  if (options.hash.propertyBinding) {
    options.hash.property = options.data.view.getStream(options.hash.propertyBinding).value();
  }
  return viewHelper(this, ErrorView, options);
}
