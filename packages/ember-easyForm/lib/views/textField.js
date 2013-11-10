Ember.EasyForm.TextField = Ember.TextField.extend({
  classNameBindings: ['showError:invalid', 'showValid:valid']
});
