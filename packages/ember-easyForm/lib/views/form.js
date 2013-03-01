Ember.EasyForm.Form = Ember.View.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: 'novalidate',
  submit: function(event) {
    var object = this.get('context').get('content'), _this = this;

    if (event) {
      event.preventDefault();
    }

    if (object.validate === undefined) {
      this.get('controller').send('submit');
    } else {
      object.validate().then(function() {
        if (object.get('isValid') === true) {
          _this.get('controller').send('submit');
        }
      });
    }
  }
});
