Ember.EasyForm.BaseView = Ember.View.extend({
  wrapper: function() {
    var wrapperView = this.nearestWithProperty('wrapper');
    if (wrapperView) {
      return wrapperView.get('wrapper');
    } else {
      return 'default';
    }
  }.property(),
  wrapperConfig: function() {
    return Ember.EasyForm.Config.getWrapper(this.get('wrapper'));
  }.property('wrapper'),
  templateForName: function(name) {
    return Ember.EasyForm.Config.getTemplate(name);
  },
  formForModel: function(){
    var formForModelPath = this.get('templateData.keywords.formForModelPath');

    if (formForModelPath) {
      return this.get('context.' + formForModelPath);
    } else {
      return this.get('context');
    }
  }.property()
});
