Ember.EasyForm.BaseView = Ember.View.extend({
  getWrapperConfig: function(configName) {
    var wrapper = Ember.EasyForm.Config.getWrapper(this.get('wrapper'));
    return wrapper[configName];
  },
  wrapper: Ember.computed(function() {
    // Find the first parent with 'wrapper' defined.
    var parentView = this.get('parentView');
    while(parentView){
      var config = parentView.get('wrapper');
      if (config) return config;
      parentView = parentView.get('parentView');
    }

    return 'default';
  })
});