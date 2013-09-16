Ember.EasyForm.Form = Ember.EasyForm.BaseView.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: 'novalidate',
  wrapper: 'default',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('formClass'));
    this.action = this.action || 'submit';
  },
  submit: function(event) {
    var _this = this, promise;

    if (event) {
      event.preventDefault();
    }

    if (Ember.isNone(this.get('context.validate'))) {
      this.get('controller').send(this.action);
    } else {
      if (!Ember.isNone(this.get('context').validate)) {
        promise = this.get('context').validate();
      } else {
        promise = this.get('context.content').validate();
      }
      promise.then(function() {
        if (_this.get('context.isValid')) {
          _this.get('controller').send(_this.action);
        }
      });
    }
  }
});
