Ember.FormBuilder.Input = Ember.View.extend({
  tagName: 'div',
  classNames: ['input', 'string'],
  classNameBindings: ['error:field_with_errors'],
  init: function() {
    this._super();
    this.set('model', this._context);
    this.set('template', Ember.Handlebars.compile('<label for="'+this.labelFor()+'"}}>'+this.labelText()+'</label>\n{{'+this.inputHelper()+' '+this.property+'}}{{error '+this.property+'}}'));
    this.reopen({
      error: function() {
        return this.model.errors.get(this.property) !== undefined;
      }.property('model.errors.'+this.property)
    });
  },
  labelFor: function() {
    return Ember.guidFor(this.model);
  },
  labelText: function() {
    return this.label || this.property.underscore().split('_').join(' ').capitalize();
  },
  inputHelper: function() {
    if(this.as === 'text') {
      return 'textArea';
    } else {
      return 'textField';
    }
  },
  focusOut: function() {
    this.model.validate(this.property);
  }
});
