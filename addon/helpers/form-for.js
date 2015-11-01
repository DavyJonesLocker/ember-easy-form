import FormView from 'ember-easy-form/views/form';
import {viewHelper} from 'ember-easy-form/shims';

export default function(object, options) {
  var parentView = options.data.view;

  viewHelper(this, FormView, options);

  var newView = parentView._childViews[parentView._childViews.length - 1];

  newView._keywords.formForModelPath = object;

  return newView;
}
