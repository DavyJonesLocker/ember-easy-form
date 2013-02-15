Ember.FormBuilder.Form = Ember.View.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: 'novalidate',
  submit: function(event) {
    if (this.get('context').validate === undefined || this.get('context').validate()) {
      this.get('controller').send('submit');
    }
    if (event) {
      event.preventDefault();
    }
  }
});
