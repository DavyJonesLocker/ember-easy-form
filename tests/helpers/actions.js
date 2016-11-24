import Ember from 'ember';
import { focus, fireEvent } from './events';

const {
  run
} = Ember;

export function fillIn(context, selector, text) {
  let $el, el;
  $el = findWithAssert(selector, context);
  el = $el[0];

  return run(() => {
    focus(el);

    $el.eq(0).val(text);
    fireEvent(el, 'input');
    fireEvent(el, 'change');
  });
}

export function findWithAssert(selector, context) {
  let $el = find(selector, context);

  if ($el.length === 0) {
    throw new Error('Element ' + selector + ' not found.');
  }

  return $el;
}

export function find(selector, context) {
  return context.$(selector);
}
