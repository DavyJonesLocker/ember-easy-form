import Ember from 'ember';
import config from 'ember-easy-form/config';

export default Ember.Mixin.create({
  classNameBindings: ['property'],

  wrapper: Ember.computed(function() {
    var wrapperView = this.nearestWithProperty('wrapper');
    if (wrapperView) {
      return wrapperView.get('wrapper');
    } else {
      return 'default';
    }
  }),

  wrapperConfig: Ember.computed('wrapper', function() {
    return config.getWrapper(this.get('wrapper'));
  }),

  init: function() {
    this._super(...arguments);
    var pathToProperty = 'model';
    var currentView = this;
    while(currentView && !('model' in currentView)) {
      pathToProperty = 'parentView.' + pathToProperty;
      currentView = Ember.get(currentView, 'parentView');
    }
    if (currentView) {
      Ember.defineProperty(this, 'formForModel', Ember.computed.alias(pathToProperty));
    } else {
      this.set('formForModel', null);
    }
  }
});
