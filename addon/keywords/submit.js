export default {
  render(morph, env, scope, params, hash, template, inverse, visitor) {
    let componentName = hash.as === 'button' ? 'form-button' : 'form-submit';
    env.hooks.component(morph, env, scope, componentName, params, hash, { default: template, inverse }, visitor);
  },

  rerender(...args) {
    this.render(...args);
  }
};
