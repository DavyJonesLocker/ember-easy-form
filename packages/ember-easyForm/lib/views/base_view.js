Ember.EasyForm.BaseView = Ember.View.extend(Ember.EasyForm.WrapperConfigMixin, {
  formForModel: function(){
    var formForModelPath = this.get('templateData.keywords.formForModelPath');

    if (formForModelPath) {
      return this.get('context.' + formForModelPath);
    } else {
      return this.get('context');
    }
  }.property(),
});
