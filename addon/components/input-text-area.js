import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

export default Ember.TextArea.extend(WrapperMixin, {
  init: function() {
    this._super(...arguments);
    var dependentKey = 'formForModel.' + this.get('property');
    Ember.Binding.from(dependentKey).to('value').connect(this);
  }
});
