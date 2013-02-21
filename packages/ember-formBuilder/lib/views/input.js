Ember.FormBuilder.Input = Ember.View.extend({
  tagName: 'div',
  classNames: ['input', 'string'],
  classNameBindings: ['error:field_with_errors'],
  init: function() {
    this._super();
    this.set('model', this._context);
    this.set('template', Ember.Handlebars.compile('<label for="'+this.labelFor()+'"}}>'+this.labelText()+'</label>\n{{'+this.inputHelper()+' '+this.property+this.printInputOptions()+'}}{{error '+this.property+'}}'));
    if(this.model.errors) {
      this.reopen({
        error: function() {
          return this.model.errors.get(this.property) !== undefined;
        }.property('model.errors.'+this.property)
      });
    }
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
  printInputOptions: function() {
    var string = '', key, inputOptions;
    inputOptions = this.prepareInputOptions(this.inputOptions);
    if (inputOptions) {
      for (key in inputOptions) {
        string = string.concat('' + key + '="' + this.inputOptions[key] + '"');
      }
      string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      return ' ' + string;
    }
  },
  prepareInputOptions: function(options) {
    if (!options.type) {
      if (this.property.match(/password/)) {
        options.type = 'password';
      } else if (this.property.match(/email/)) {
        options.type = 'email';
      }
    }
    return options;
  },
  focusOut: function() {
    if (this.model.validate) {
      this.model.validate(this.property);
    }
  }
});
