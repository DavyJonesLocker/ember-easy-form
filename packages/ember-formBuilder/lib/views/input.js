Ember.FormBuilder.Input = Ember.View.extend({
  tagName: 'div',
  classNames: ['input', 'string'],
  init: function() {
    this._super();
    this.set('template', Ember.Handlebars.compile('<label for="'+this.labelFor()+'"}}>'+this.labelText()+'</label>\n{{'+this.inputHelper()+' '+this.property+'}}'));
  },
  labelFor: function() {
    return Ember.guidFor(this._context);
  },
  labelText: function() {
    return this.label || this.property.underscore().split('_').join(' ').capitalize();
  },
  inputHelper: function() {
    return 'textField';
  }
});
