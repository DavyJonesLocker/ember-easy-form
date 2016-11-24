import Ember from 'ember';
import layout from '../templates/components/form-for';

const {
  get,
  Component,
  Error: EmberError
} = Ember;

let FormForComponent = Component.extend({
  layout,
  classNames: ['easy-form'],
  tagName: 'form',

  init() {
    let subject = get(this, 'subject');

    if (!subject) {
      let error = new EmberError('subject must be passed to `form-for` as either positional param or explicit param');
      throw(error);
    }

    for (let key in this) {
      if (key.indexOf('HAS_BLOCK') !== -1 && !this[key]) {
        let error = new EmberError('cannot take inline, only block');
        throw(error);
      }
    }

    return this._super(...arguments);
  }
});

FormForComponent.reopenClass({
  positionalParams: ['subject']
});

export default FormForComponent;
