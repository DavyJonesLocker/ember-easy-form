import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';
import {humanize} from 'ember-easy-form/utilities';
import {assign} from 'ember-easy-form/utilities';

const PropertyNameNotDefinedMessage = 'Please, define the property name. ' +
  'You probably forgot to quote the property name in some `input-for` component.';

var FormInputComponent = Ember.Component.extend(WrapperMixin, {
  layoutName: Ember.computed.oneWay('wrapperConfig.inputTemplate'),

  model: Ember.computed(function() {
    var component = this.nearestWithProperty('model');
    return Ember.get(component, 'model');
  }),

  value: Ember.computed('model', 'propertyName', function() {
    var propertyName = this.get('propertyName');
    if (!propertyName) {
      throw PropertyNameNotDefinedMessage;
    }
    return Ember.get(this.get('model'), propertyName);
  }),

  hintText: Ember.computed.reads('hint'),

  labelText: Ember.computed('propertyName', 'label', function() {
    var propertyName = this.get('propertyName');
    if (!propertyName) {
      throw PropertyNameNotDefinedMessage;
    }
    return this.get('label') || humanize(propertyName);
  }),

  name: Ember.computed('property', 'propertyName', function() {
    var propertyName = this.get('propertyName');
    if (!propertyName) {
      throw PropertyNameNotDefinedMessage;
    }
    return this.get('property') || propertyName;
  }),

  init: function() {
    this._super(...arguments);
    var property = this.get('propertyName');

    this.classNameBindings.push('showError:' + this.get('wrapperConfig.fieldErrorClass'));
    Ember.defineProperty(this, 'showError', Ember.computed('canShowValidationError', 'formForModel.errors.' + property + '.[]', function() {
      var errors = this.get('formForModel.errors.' + property);
      var canShowValidationError = this.get('canShowValidationError');
      return !!(canShowValidationError && errors && errors[0]);
    }));
  },
  setupValidationDependencies: Ember.on('init', function() {
    this._keysForValidationDependencies = Ember.A();
    var keys = this.get('formForModel._dependentValidationKeys'), key;
    if (keys) {
      var propertyName = this.get('propertyName');
      for(key in keys) {
        if (keys[key].indexOf(propertyName) > -1) {
          this._keysForValidationDependencies.pushObject(key);
        }
      }
    }
  }),
  _keysForValidationDependencies: Ember.A(),
  dependentValidationKeyCanTrigger: false,
  tagName: 'div',
  classNames: ['string'],
  classNameBindings: ['wrapperConfig.inputClass', 'propertyName'],
  didInsertElement: function() {
    var labelComponent, inputComponent;

    this.forEachChildView((view) => {
      if (view.isLabel) {
        labelComponent = view;
      }
      if (view.isInput) {
        inputComponent = view;
      }
    });

    if (labelComponent && inputComponent) {
      // This is not the best way to do it. We should not change the element after it was created.
      labelComponent.set('for', Ember.get(inputComponent, 'elementId'));
    }
  },
  focusOut: function() {
    this.set('hasFocusedOut', true);
    this.showValidationError();
  },
  inputOptions: Ember.computed('savedInputOptions', 'attrs', function() {
    var inputOptions = this.get('savedInputOptions');
    if (!inputOptions) {
      // Move all values to the `inputOptions` hash, except the ones we use in the `internal-input-for`
      inputOptions = assign({}, this.get('attrs'));
      for(let i=0; i<knownProperties.length; i++) {
        const key = knownProperties[i];
        if (inputOptions.hasOwnProperty(key)) {
          delete inputOptions[key];
        }
      }
    }
    return inputOptions;
  }),
  showValidationError: function() {
    if (this.get('hasFocusedOut')) {
      var property = this.get('propertyName');
      if (Ember.isEmpty(this.get('formForModel.errors.' + property))) {
        this.set('canShowValidationError', false);
      } else {
        this.set('canShowValidationError', true);
      }
    }
  },
  input: function() {
    this._keysForValidationDependencies.forEach(function(key) {
     this.get('parentView.childViews').forEach(function(view) {
       if (view.get('propertyName') === key) {
         view.showValidationError();
       }
     }, this);
    }, this);
  }
});

FormInputComponent.reopenClass({
  positionalParams: ['propertyName'],
});

export var knownProperties = ['propertyName', 'label', 'hint'];
export default FormInputComponent;
