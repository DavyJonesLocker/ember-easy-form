Ember.EasyForm.Form = Ember.View.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: 'novalidate',
  submit: function(event) {
    var _this = this, promise;

    if (event) {
      event.preventDefault();
    }

    if (Ember.isNone(this.get('context.validate'))) {
      this.get('controller').send('submit');
    } else {
      if (!Ember.isNone(this.get('context').validate)) {
        promise = this.get('context').validate();
      } else {
        promise = this.get('context.content').validate();
      }
      promise.then(function() {
        if (_this.get('context.isValid') === true) {
          _this.get('controller').send('submit');
        }
      });
    }
  }
});
