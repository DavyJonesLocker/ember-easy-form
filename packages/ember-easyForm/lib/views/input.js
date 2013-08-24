Ember.EasyForm.Input = Ember.EasyForm.BaseView.extend({
  init: function() {
    this._super();
    this.classNameBindings.push('error:' + this.getWrapperConfig('fieldErrorClass'));
    this.classNames.push(this.getWrapperConfig('inputClass'));
    Ember.defineProperty(this, 'error', Ember.EasyForm.errorPropertyFor(this.property));
    if (!this.isBlock) {
      if (this.getWrapperConfig('wrapControls')) {
        this.set('templateName', 'easy_form/wrapped_input');
      } else {
        this.set('templateName', 'easy_form/input');
      }
    }
  },
  tagName: 'div',
  classNames: ['string'],
  didInsertElement: function() {
    this.set('labelField-'+this.elementId+'.for', this.get('inputField-'+this.elementId+'.elementId'));
  },
  concatenatedProperties: ['inputOptions', 'bindableInputOptions'],
  inputOptions: ['as', 'inputConfig', 'collection', 'optionValuePath', 'optionLabelPath', 'selection', 'value'],
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
    if (!Ember.isNone(this.get('context.validate'))) {
      if (!Ember.isNone(this.get('context').validate)) {
        this.get('context').validate(this.property);
      } else {
        this.get('context.content').validate(this.property);
      }
    }
  }
});
