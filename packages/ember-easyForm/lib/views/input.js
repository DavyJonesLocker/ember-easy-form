Ember.EasyForm.Input = Ember.EasyForm.BaseView.extend({
  init: function() {
    this._super();
    this.classNameBindings.push('error:' + this.getWrapperConfig('fieldErrorClass'));
    this.classNames.push(this.getWrapperConfig('inputClass'));
    if (!this.isBlock) {
      this.set('template', Ember.Handlebars.compile(this.fieldsForInput()));
    }
    if(this.get('context').get('errors') !== undefined) {
      this.reopen({
        error: function() {
          return this.get('context').get('errors').get(this.property) !== undefined;
        }.property('context.errors.'+this.property)
      });
    }
  },
  tagName: 'div',
  classNames: ['string'],
  didInsertElement: function() {
    this.set('labelField-'+this.elementId+'.for', this.get('inputField-'+this.elementId+'.elementId'));
  },
  concatenatedProperties: ['inputOptions'],
  inputOptions: ['as', 'placeholder', 'inputConfig'],
  fieldsForInput: function() {
    return this.labelField() +
           this.wrapControls(
             this.inputField() +
             this.errorField() +
             this.hintField()
           );
  },
  labelField: function() {
    var options = this.label ? 'text="'+this.label+'"' : '';
    return '{{labelField '+this.property+' '+options+'}}';
  },
  inputField: function() {
    var options = '', key, inputOptions = this.inputOptions;
    for (var i = 0; i < inputOptions.length; i++) {
      key = inputOptions[i];
      if (this[key]) {
        if (typeof(this[key]) === 'boolean') {
          this[key] = key;
        }
        options = options.concat(''+key+'="'+this[inputOptions[i]]+'"');
      }
    }

    options.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    return '{{inputField '+this.property+' '+options+'}}';
  },
  errorField: function() {
    var options = '';
    return '{{errorField '+this.property+' '+options+'}}';
  },
  hintField: function() {
    var options = this.hint ? 'text="'+this.hint+'"' : '';
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
