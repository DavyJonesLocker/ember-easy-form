import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var FormFormComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'form',
  attributeBindings: ['novalidate'],
  classNameBindings: ['wrapperConfig.formClass'],
  novalidate: 'novalidate',
  wrapper: 'default',

  init: function() {
    this._super(...arguments);
    this.action = this.action || 'submit';
  },

  submit: function(event) {
    var _this = this,
        promise;

    if (event) {
      event.preventDefault();
    }

    if (Ember.isNone(this.get('model.validate'))) {
      this.sendAction();
    } else {
      if (!Ember.isNone(this.get('model').validate)) {
        promise = this.get('model').validate();
      } else {
        promise = this.get('model.content').validate();
      }
      promise.then(function() {
        if (_this.get('model.isValid')) {
          _this.sendAction();
        }
      });
    }
  }
});

FormFormComponent.reopenClass({
  positionalParams: ['model']
});

export default FormFormComponent;
