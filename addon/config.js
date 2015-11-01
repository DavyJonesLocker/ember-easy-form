import Ember from 'ember';

export default {
  _wrappers: {
    'default': {
      formClass: '',
      fieldErrorClass: 'fieldWithErrors',
      inputClass: 'input',
      errorClass: 'error',
      hintClass: 'hint',
      labelClass: '',
      inputTemplate: 'components/easy-form/form-input',
      errorTemplate: 'components/easy-form/error-field',
      labelTemplate: 'components/easy-form/label-field',
      hintTemplate: 'components/easy-form/hint-field',
      wrapControls: false,
      controlsWrapperClass: '',
      buttonClass: ''
    }
  },
  modulePrefix: 'appkit',
  _inputTypes: {},
  _templates: {},
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
  },
  registerTemplate: function(name, template) {
    this._templates[name] = template;
  },
  getTemplate: function(name) {
    return this._templates[name];
  }
};
