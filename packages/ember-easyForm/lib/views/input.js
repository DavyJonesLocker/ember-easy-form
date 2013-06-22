Ember.EasyForm.Input = Ember.EasyForm.BaseView.extend({
  init: function() {
    this._super();
    this.classNameBindings.push('error:' + this.getWrapperConfig('fieldErrorClass'));
    this.classNames.push(this.getWrapperConfig('inputClass'));
    if (!this.isBlock) {
      this.set('template', Ember.Handlebars.compile(this.fieldsForInput()));
    }

    this.reopen({
      error: function() {
        return !Ember.isNone(this.get('context.errors.' + this.property));
      }.property('context.errors.'+this.property)
    });
  },
  tagName: 'div',
  classNames: ['string'],
  didInsertElement: function() {
    this.set('labelField-'+this.elementId+'.for', this.get('inputField-'+this.elementId+'.elementId'));
  },
  concatenatedProperties: ['inputOptions', 'bindableInputOptions'],
  inputOptions: ['as', 'placeholder', 'inputConfig', 'collection', 'prompt', 'optionValuePath', 'optionLabelPath', 'selection', 'value'],
  bindableInputOptions: ['placeholder', 'prompt'],
  fieldsForInput: function() {
    return this.labelField() +
           this.wrapControls(
             this.inputField() +
             this.errorField() +
             this.hintField()
           );
  },
  labelField: function() {
    var options, userOptions = this.inputOptions[this.inputOptions.length - 1];
    
    if (userOptions['labelBinding']) {
      options = 'textBinding="'+userOptions['labelBinding']+'"';
    } else {
      options = this.label ? 'text="'+this.label+'"' : '';
    }

    return '{{labelField '+this.property+' '+options+'}}';
  },
  inputField: function() {
    var options = '', key, value, keyBinding, inputOptions = this.inputOptions, userOptions = inputOptions[inputOptions.length - 1], bindableInputOptions = this.bindableInputOptions;
    for (var i = 0; i < inputOptions.length-1; i++) {
      key = inputOptions[i];
      if (this[key]) {
        if (typeof(this[key]) === 'boolean') {
          this[key] = key;
        }
        value = this[inputOptions[i]];
        
        keyBinding = key + 'Binding';
        if (userOptions[keyBinding] && bindableInputOptions.contains(key)) {
          key = keyBinding;
          value = userOptions[key];
        }
        
        options = options.concat(''+key+'="'+value+'"');
      }
    }

    options.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    return '{{inputField '+this.property+' '+options+'}}';
  },
  errorField: function() {
    var options = '';
    return '{{#if errors.' + this.property + '}}{{{errorField '+this.property+' '+options+'}}{{/if}}';
  },
  hintField: function() {
    var options, userOptions = this.inputOptions[this.inputOptions.length - 1];

    if (userOptions['hintBinding']) {
      options = 'textBinding="'+userOptions['hintBinding']+'"';
    } else {
      options = this.hint ? 'text="'+this.hint+'"' : '';
    }

    return '{{hintField '+this.property+' '+options+'}}';
  },
  wrapControls: function(controls) {
    if (this.getWrapperConfig('wrapControls')) {
      return '<div class="' + this.getWrapperConfig('controlsWrapperClass') + '">' +
             controls +
             '</div>';
    } else {
      return controls;
    }
  },
  focusOut: function() {
    if (!Ember.isNone(this.get('context.validate'))) {
      if (!Ember.isNone(this.get('context').validate)) {
        this.get('context').validate(this.property);
      } else {
        this.get('context.content').validate(this.property);
      }
    }
  }
});
