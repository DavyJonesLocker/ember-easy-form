import Label from 'ember-easy-form/views/label';
import {processOptions} from 'ember-easy-form/utilities';
import {viewHelper} from 'ember-easy-form/shims';

export default function(property, options) {
  options = processOptions(property, options);
  options.hash.viewName = 'label-field-'+options.data.view.elementId;
  return viewHelper(this, Label, options);
}
