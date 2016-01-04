import Ember from 'ember';
import inputField from  'ember-easy-form/keywords/input-field';
import inputFor from  'ember-easy-form/keywords/input-for';
import submit from  'ember-easy-form/keywords/submit';

var require = Ember.__loader.require;
var registerKeyword = require('ember-htmlbars/keywords').registerKeyword;

var registered = false;

export default function() {
  if (!registered) {
    registerKeyword('input-field', inputField);
    registerKeyword('input-for', inputFor);
    registerKeyword('submit', submit);

    registered = true;
  }
}
