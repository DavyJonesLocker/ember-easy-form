import Ember from 'ember';
import TextFieldView from 'ember-easy-form/views/text-field';
import CheckboxView from 'ember-easy-form/views/checkbox';
import TextAreaView from 'ember-easy-form/views/text-area';
import SelectView from 'ember-easy-form/views/select';
import config from 'ember-easy-form/config';
import {processOptions} from 'ember-easy-form/utilities';
import {viewHelper} from 'ember-easy-form/shims';

const {get} = Ember;

function getPropertyType(model, key) {
  if (model && model.constructor.proto) {
    var proto = model.constructor.proto();
    var possibleDesc = proto[key];
    var desc = (possibleDesc !== null && typeof possibleDesc === 'object' && possibleDesc.isDescriptor) ? possibleDesc : undefined;
    if (desc && desc._meta) {
      return desc._meta.type;
    }
  }
  return null;
}

export default function(property, options) {
  function handlebarsGet(root, path, options) {
    return options.data.view.getStream(path).value();
  }

  options = processOptions(property, options);

  if (options.hash.propertyBinding) {
    options.hash.property = handlebarsGet(this, options.hash.propertyBinding, options);
  }

  if (options.hash.inputOptionsBinding) {
    options.hash.inputOptions = handlebarsGet(this, options.hash.inputOptionsBinding, options);
  }

  var modelPath = handlebarsGet(this, 'formForModelPath', options);
  options.hash.modelPath = modelPath;

  property = options.hash.property;

  var modelPropertyPath = function(property) {
    if(!property) { return null; }

    var startsWithKeyword = !!options.data.view._keywords[property.split('.')[0]];

    if (startsWithKeyword) {
      return property;
    }

    if (modelPath) {
      return modelPath + '.' + property;
    } else {
      return property;
    }
  };

  options.hash.valueBinding = modelPropertyPath(property);


  var context = options.data.view,
    propertyContext = get(context, 'context'),
    propertyValue = get(propertyContext, modelPropertyPath(property)),
    propertyType = function(property) {
      if (propertyContext && modelPath) {
        const formModel = get(propertyContext, modelPath);
        return getPropertyType(formModel, property);
      }
    };

  options.hash.viewName = 'input-field-'+options.data.view.elementId;

  if (options.hash.inputOptions) {
    var inputOptions = options.hash.inputOptions, optionName;
    for (optionName in inputOptions) {
      if (inputOptions.hasOwnProperty(optionName)) {
       options.hash[optionName] = inputOptions[optionName];
      }
    }
    delete options.hash.inputOptions;
  }

  if (options.hash.as === 'text') {
    return viewHelper(context, TextAreaView, options);
  } else if (options.hash.as === 'select') {
    delete(options.hash.valueBinding);

    options.hash.contentBinding   = modelPropertyPath(options.hash.collection);
    options.hash.selectionBinding = modelPropertyPath(options.hash.selection);
    options.hash.valueBinding     = modelPropertyPath(options.hash.value);

    if (Ember.isNone(options.hash.selectionBinding) && Ember.isNone(options.hash.valueBinding)) {
      options.hash.selectionBinding = modelPropertyPath(property);
    }

    return viewHelper(context, SelectView, options);
  } else if (options.hash.as === 'checkbox') {
    if (Ember.isNone(options.hash.checkedBinding)) {
      options.hash.checkedBinding = modelPropertyPath(property);
    }

    return viewHelper(context, CheckboxView, options);
  } else {
    if (!options.hash.as) {
      if (property.match(/password/)) {
        options.hash.type = 'password';
      } else if (property.match(/email/)) {
        options.hash.type = 'email';
      } else if (property.match(/url/)) {
        options.hash.type = 'url';
      } else if (property.match(/color/)) {
        options.hash.type = 'color';
      } else if (property.match(/^tel/)) {
        options.hash.type = 'tel';
      } else if (property.match(/search/)) {
        options.hash.type = 'search';
      } else {
        if (propertyType(property) === 'number' || typeof(propertyValue) === 'number') {
          options.hash.type = 'number';
        } else if (propertyType(property) === 'date' || (!Ember.isNone(propertyValue) && propertyValue.constructor === Date)) {
          options.hash.type = 'date';
        } else if (propertyType(property) === 'boolean' || (!Ember.isNone(propertyValue) && propertyValue.constructor === Boolean)) {
          options.hash.checkedBinding = property;
          return viewHelper(context, CheckboxView, options);
        }
      }
    } else {
      var inputType = config.getInputType(options.hash.as);
      if (inputType) {
        return viewHelper(context, inputType, options);
      }

      options.hash.type = options.hash.as;
    }
    return viewHelper(context, TextFieldView, options);
  }
}
