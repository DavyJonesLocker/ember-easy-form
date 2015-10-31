import ButtonView from 'ember-easy-form/views/button';
import SubmitView from 'ember-easy-form/views/submit';
import {viewHelper} from 'ember-easy-form/shims';

export default function(value, options) {
  if (typeof(value) === 'object') {
    options = value;
    value = undefined;
  }
  options.hash.context = this;
  options.hash.value = value || 'Submit';
  return (options.hash.as === 'button') ?
    viewHelper(this, ButtonView, options)
    :
    viewHelper(this, SubmitView, options);
}
