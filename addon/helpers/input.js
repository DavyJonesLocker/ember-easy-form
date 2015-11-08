import Ember from 'ember';

export default {
  isHTMLBars: true,
  helperFunction: function(params, hash, options, env) {
    var helperName = params.length === 0 ? 'ember-input' : 'easy-form-input';
    return Ember.Handlebars.helpers[helperName].helperFunction.call(
      this, params, hash, options, env
    );
  }
};