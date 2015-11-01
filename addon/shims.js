import Ember from 'ember';

export function callHelper(helperName, context, params, options, env) {
  env = env ? env : options;

  return Ember.Handlebars.helpers[helperName].helperFunction.call(
    context, params, options.hash, options, options
  );
}

export function viewHelper(context, View, options) {
  return callHelper('view', context, [View], options);
}
