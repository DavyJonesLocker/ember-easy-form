Ember.EasyForm.Form = Ember.View.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: 'novalidate',
  submit: function(event) {
    var object = this.get('context').get('content');

    if (object.validate === undefined || object.validate()) {
      this.get('controller').send('submit');
    }
    if (event) {
      event.preventDefault();
    }
  }
});
