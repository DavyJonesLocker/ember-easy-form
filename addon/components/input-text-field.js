import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

export default Ember.TextField.extend(WrapperMixin, {
  init: function() {
    this._super(...arguments);
    var dependentKey = 'formForModel.' + this.get('property');
    if (!this.hasOwnProperty('value')) {
      Ember.Binding.from(dependentKey).to('value').connect(this);
    }
    if (this.get('type') === 'checkbox') {
      Ember.Binding.from(dependentKey).to('checked').connect(this);
      this.get('attributeBindings').push('checked');
    }
  }
});
