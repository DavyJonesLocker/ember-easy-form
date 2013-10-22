Ember.EasyForm.WrapperConfigMixin = Ember.Mixin.create({
  getWrapperConfig: function(configName) {
    var wrapper = Ember.EasyForm.Config.getWrapper(this.get('wrapper'));
    return wrapper[configName];
  },
  wrapper: Ember.computed(function() {
    var wrapperView = this.nearestWithProperty('wrapper');
    if (wrapperView) {
      return wrapperView.get('wrapper');
    } else {
      return 'default';
    }
  })
});
