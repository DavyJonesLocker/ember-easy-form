Ember.EasyForm.Input = Ember.View.extend({
  init: function() {
    this._super();
    this.set('template', Ember.Handlebars.compile('<label for="'+this.labelFor()+'"}}>'+this.labelText()+'</label>\n{{'+this.inputHelper()+' '+this.property+this.printInputOptions()+'}}{{error '+this.property+'}}'));
    if(this.get('context').get('errors') !== undefined) {
      this.reopen({
        error: function() {
          return this.get('context').get('errors').get(this.property) !== undefined;
        }.property('context.errors.'+this.property)
      });
    }
  },
  tagName: 'div',
  classNames: ['input', 'string'],
  classNameBindings: ['error:field_with_errors'],
  labelFor: function() {
    return Ember.guidFor(this.get('context').get(this.property));
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
    var object = this.get('context').get('content');
    if (!options.type) {
      if (this.property.match(/password/)) {
        options.type = 'password';
      } else if (this.property.match(/email/)) {
        options.type = 'email';
      } else {
        if (this.propertyType(object, this.property) === 'number' || typeof(object.get(this.property)) === 'number') {
          options.type = 'number';
        } else if (this.propertyType(object, this.property) === 'date' || (object.get(this.property) !== undefined && object.get(this.property).constructor === Date)) {
          options.type = 'date';
        }
      }
    }
    return options;
  },
  focusOut: function() {
    if (this.get('context').get('content').validate) {
      this.get('context').get('content').validate(this.property);
    }
  },
  propertyType: function(object, property) {
    try {
      return object.constructor.metaForProperty(property);
    } catch(e) {
      return null;
    }
  }
});
