Ember.EasyForm.Form = Ember.EasyForm.BaseView.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  classNameBindings: ['wrapperConfig.formClass'],
  novalidate: 'novalidate',
  wrapper: 'default',
  init: function() {
    this._super();
    this.action = this.action || 'submit';
  },
  submit: function(event) {
    var _this = this,
        promise;

    if (event) {
      event.preventDefault();
    }

    if (Ember.isNone(this.get('formForModel.validate'))) {
      this.get('controller').send(this.action);
    } else {
      if (!Ember.isNone(this.get('formForModel').validate)) {
        promise = this.get('formForModel').validate();
      } else {
        promise = this.get('formForModel.content').validate();
      }
      promise.then(function() {
        if (_this.get('formForModel.isValid')) {
          _this.get('controller').send(_this.action);
        }
      });
    }
  }
});
