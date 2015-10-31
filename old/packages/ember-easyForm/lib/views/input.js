Ember.EasyForm.Input = Ember.EasyForm.BaseView.extend({
  init: function() {
    this._super();
    this.classNameBindings.push('showError:' + this.get('wrapperConfig.fieldErrorClass'));
    Ember.defineProperty(this, 'showError', Ember.computed.and('canShowValidationError', 'formForModel.errors.' + this.property + '.firstObject'));
    if (!this.isBlock) {
      this.set('templateName', this.get('wrapperConfig.inputTemplate'));
    }
  },
  setupValidationDependencies: function() {
    var keys = this.get('formForModel._dependentValidationKeys'), key;
    if (keys) {
      for(key in keys) {
        if (keys[key].contains(this.property)) {
          this._keysForValidationDependencies.pushObject(key);
        }
      }
    }
  }.on('init'),
  _keysForValidationDependencies: Ember.A(),
  dependentValidationKeyCanTrigger: false,
  tagName: 'div',
  classNames: ['string'],
  classNameBindings: ['wrapperConfig.inputClass'],
  didInsertElement: function() {
    var name = 'label-field-'+this.elementId,
        label = this.get(name);
    if (!label) { return; }
    this.set(name+'.for', this.get('input-field-'+this.elementId+'.elementId'));
  },
  concatenatedProperties: ['inputOptions', 'bindableInputOptions'],
  inputOptions: ['as', 'collection', 'optionValuePath', 'optionLabelPath', 'selection', 'value', 'multiple', 'name'],
  bindableInputOptions: ['placeholder', 'prompt', 'disabled'],
  defaultOptions: {
    name: function(){
      if (this.property) {
        return this.property;
      }
    }
  },
  inputOptionsValues: function() {
    var options = {}, i, key, keyBinding, value, inputOptions = this.inputOptions, bindableInputOptions = this.bindableInputOptions, defaultOptions = this.defaultOptions;
    for (i = 0; i < inputOptions.length; i++) {
      key = inputOptions[i];
      if (this[key]) {
        if (typeof(this[key]) === 'boolean') {
          this[key] = key;
        }

        options[key] = this[key];
      }
    }
    for (i = 0; i < bindableInputOptions.length; i++) {
      key = bindableInputOptions[i];
      keyBinding = key + 'Binding';
      if (this[key] || this[keyBinding]) {
        options[keyBinding] = 'view.' + key;
      }
    }

    for (key in defaultOptions) {
      if (!defaultOptions.hasOwnProperty(key)) { continue; }
      if (options[key]) { continue; }

      if (value = defaultOptions[key].apply(this)) {
        options[key] = value;
      }
    }

    return options;
  }.property(),
  focusOut: function() {
    this.set('hasFocusedOut', true);
    this.showValidationError();
  },
  showValidationError: function() {
    if (this.get('hasFocusedOut')) {
      if (Ember.isEmpty(this.get('formForModel.errors.' + this.property))) {
        this.set('canShowValidationError', false);
      } else {
        this.set('canShowValidationError', true);
      }
    }
  },
  input: function() {
    this._keysForValidationDependencies.forEach(function(key) {
     this.get('parentView.childViews').forEach(function(view) {
       if (view.property === key) {
         view.showValidationError();
       }
     }, this);
    }, this);
  }
});
