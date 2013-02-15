Ember.FormBuilder.Form = Ember.View.extend({
  tagName: 'form',
  submit: function(event) {
    if (this.get('context').validate()) {
      this.get('controller').send('submit');
    }
  }
});
