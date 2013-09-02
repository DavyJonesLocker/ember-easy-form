Ember.EasyForm.Input = Ember.EasyForm.BaseView.extend({
  init: function() {
    this._super();
    this.classNameBindings.push('showError:' + this.getWrapperConfig('fieldErrorClass'));
    this.classNames.push(this.getWrapperConfig('inputClass'));
    Ember.defineProperty(this, 'showError', Ember.computed.and('focusOutShowError', 'context.errors.' + this.property + '.firstObject'));
    if (!this.isBlock) {
      if (this.getWrapperConfig('wrapControls')) {
        this.set('templateName', 'easyForm/wrapped_input');
      } else {
        this.set('templateName', 'easyForm/input');
      }
    }
  },
  tagName: 'div',
  classNames: ['string'],
  didInsertElement: function() {
    this.set('labelField-'+this.elementId+'.for', this.get('inputField-'+this.elementId+'.elementId'));
  },
  concatenatedProperties: ['inputOptions', 'bindableInputOptions'],
  inputOptions: ['as', 'inputConfig', 'collection', 'optionValuePath', 'optionLabelPath', 'selection', 'value', 'size'],
  bindableInputOptions: ['placeholder', 'prompt'],
  controlsWrapperClass: function() {
    return this.getWrapperConfig('controlsWrapperClass');
  }.property(),
  inputOptionsValues: function() {
    var options = {}, i, value, key, keyBinding, inputOptions = this.inputOptions, bindableInputOptions = this.bindableInputOptions;
    for (i = 0; i < inputOptions.length; i++) {
      key = inputOptions[i];
      value = this.get(key);
      if (value) {
        if (typeof(value) === 'boolean') {
          value = key;
        }
        options[key] = value;
      }
    }
    for (i = 0; i < bindableInputOptions.length; i++) {
      key = bindableInputOptions[i];
      keyBinding = key + 'Binding';
      if (this.get(key) || this.get(keyBinding)) {
        options[keyBinding] = 'view.' + key;
      }
    }
    return options;
  }.property(),
  focusOut: function() {
    if (Ember.isEmpty(this.get('context.errors.' + this.property))) {
      this.set('focusOutShowError', false);
    } else {
      this.set('focusOutShowError', true);
    }
  }
});
