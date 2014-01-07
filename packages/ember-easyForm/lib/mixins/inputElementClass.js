Ember.EasyForm.InputElementClassMixin = Ember.Mixin.create(Ember.EasyForm.WrapperConfigMixin, {
  init: function() {
    var cls = this.getWrapperConfig('inputElementClass');
    this._super();
    if (!Ember.isEmpty(cls)) {
      this.classNames.push(cls);
    }
  },
});
