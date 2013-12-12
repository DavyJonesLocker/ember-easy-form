Ember.EasyForm.BaseView = Ember.View.extend({
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
  }),
  formForModel: function(){
    var formForModelPath = this.get('templateData.keywords.formForModelPath');

    if (formForModelPath) {
      return this.get('context.' + formForModelPath);
    } else {
      return this.get('context');
    }
  }.property(),
});
