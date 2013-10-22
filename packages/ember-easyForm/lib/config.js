Ember.EasyForm.Config = Ember.Namespace.create({
  _wrappers: {
    'default': {
      formClass: '',
      fieldErrorClass: 'fieldWithErrors',
      inputClass: 'input',
      inputElementClass: '',
      errorClass: 'error',
      hintClass: 'hint',
      labelClass: '',
      wrapControls: false,
      controlsWrapperClass: ''
    }
  },
  _inputTypes: {},
  registerWrapper: function(name, wrapper) {
    this._wrappers[name] = Ember.$.extend({}, this._wrappers['default'], wrapper);
  },
  getWrapper: function(name) {
    var wrapper = this._wrappers[name];
    Ember.assert("The wrapper '" + name + "' was not registered.", wrapper);
    return wrapper;
  },
  registerInputType: function(name, type){
    this._inputTypes[name] = type;
  },
  getInputType: function(name) {
    return this._inputTypes[name];
  }
});
