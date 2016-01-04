# Ember EasyForm #

[![Build Status](https://secure.travis-ci.org/dockyard/ember-easy-form.png?branch=master)](http://travis-ci.org/dockyard/ember-easy-form)

EasyForm for Ember

Development on this library will be on-going until `1.0`. We follow
`Semantic Versioning` so expect backwards incompatible changes between
minor version bumps. Patch version bumps will not introduce backwards
incompatible changes but older minor version will not be actively
supported.

## Compatibility ##

The current release is compatible with **Ember 1.13** and **Ember 2.***.

If you are upgrading from a previous version, please, see the [CHANGELOG](CHANGELOG.md).

## Installation ##

```bash
ember install ember-easy-form
```

## Looking for help? ##

If it is a bug [please open an issue on
GitHub](https://github.com/dockyard/ember-easy-form/issues).

## Usage ##

The `form-for` helper is used like so:

```handlebars
{{#form-for model}}
  {{input-for "firstName"}}
  {{input-for "lastName"}}
  {{input-for "bio" as="text"}}
{{/form-for}}
```

This will result in the following semantic structure:

```html
<form>
  <div class="input string">
    <label for="ember1">First name</label>
    <input id="ember1" type="text"/>
    <span class="error"></span>
  </div>
  <div class="input string">
    <label for="ember2">Last name</label>
    <input id="ember2" type="text"/>
    <span class="error"></span>
  </div>
  <div class="input string">
    <label for="ember3">Bio</label>
    <textarea id="ember3"></textarea>
    <span class="error"></span>
  </div>
</form>
```

## Customizing Inputs

You can customize your input by passing certain options.

```handlebars
{{input-for "secret" as="hidden"}}
```

`ember-easy-form` will also try to determine the type automatically
based upon the property name:

```handlebars
{{input-for "email"}}
{{input-for "password"}}
```

This will set the first input with `type="email"` and the second with
`type="password"`

Pass the `label` option to set the label text:

```handlebars
{{input-for "firstName" label="Your Name"}}
```

`label` could be pass as binding as well:

```handlebars
{{input-for "firstName" label=myLabelText}}
```

where `myLabelText` could be a computed property defined in your controller.

Pass the `placeholder` option to set a placeholder:

```handlebars
{{input-for "firstName" placeholder="Enter your first name"}}
```

`placeholder` could be pass as binding as well:

```handlebars
{{input-for "firstName" placeholder=myPlaceholder}}
```

where `myPlaceholder` could be a computed property defined in your controller.

Pass the `hint` option to set a hint:

```handlebars
{{input-for "firstName" hint="Enter your first name"}}
```

`hint` could be pass as binding as well:

```handlebars
{{input-for "firstName" hint=someHint}}
```

where `someHint` could be a computed property defined in your controller.


### Input Blocks

Inputs can be used in the default inline form as already seen or they can
be used as blocks such as:

```handlebars
{{#input-for "firstName"}}
  {{input-field "firstName"}}{{label-field "firstName"}}
  <br/>
  {{error-field "firstName"}}
{{/input-for}}
```

Inside the block you can add any markup you'd like and everything will
be wrapped inside the container `div` that is created by the original
`input-for`. You can should use the following helpers:

#### label-field

Renders the label field used by `input-for`. The first parameter is the
property, the remainder parameters are options.

##### options

* `text` - the text for the label

```handlebars
{{label-field "firstName" text="Your first name"}}
```

#### input-field

Renders the input field used by `input-for`. The first parameter is the
property, the remaining properties are options. The input itself will
default a `type` of `password` if the property contains "password",
likewise for "email".

##### options

* `placeholder` - sets the placeholder attribute
* `as` - accepts the following:
  * `text` - renders a `textarea` input
  * `email`
  * `password`
  * `url`
  * `color`
  * `tel`
  * `search`
  * `hidden`
  * `checkbox`

```handlebars
{{input-field "bio" as="text"}}
{{input-field "email"}}
```

#### error-field

Renders the error span used by `input-for` where the first available
validation error message will be rendered. The first parameter will be
the property.

```handlebars
{{error-field "firstName"}}
```

#### hint-field

Renders a text containing instructions to the user. The first parameter is the property, the remaining properties are options.

##### options

* `text` - the text for the hint

```handlebars
{{hint-field "firstName" text="Your first name"}}
```

### Custom Input Types

You can register custom input types used in the `as` option of `input-for`. To register the custom input, use the method `registerInputType` in the module `ember-easy-form/config` passing the name of the custom input, and its view. This is usually done in an initializer.

```javascript
// app/initializers/easy-form-config.js
import Ember from 'ember';
import config from 'ember-easy-form/config';

export default {
  name: 'easy-form-config',
  initialize: function () {
    config.registerInputType('my_input', 'some-component');
  }
};
```

To use the custom input, define the `as` option:

```handlebars
{{input-for "name" as="my_input"}}
```


## Wrappers
To customize how the form will be rendered you can use **wrappers**. A wrapper defines the classes used by controls, errors, labels and hints.

### Options

* `formClass` - class used by the `form`
* `fieldErrorClass` - class used by the field containing errors
* `inputClass` - class used by the `div` containing all elements of the input (label, input, error and hint)
* `errorClass` - class used by the error message
* `hintClass` - class used by the hint message
* `labelClass` - class used by the label
* `submitClass` - class used by the submit button
* `inputTemplate` - template used by {{input-for}}
* `labelTemplate` - template used by {{label-field}}
* `errorTemplate` - template used by {{error-field}}
* `hintTemplate` - template used by {{hint-field}}
* `submitButtonTemplate` - template used by {{submit as='button'}}

### Registering a wrapper
To register a wrapper, use the method `registerWrapper` in the module `ember-easy-form/config` passing the wrapper name and its options. You can define many wrappers, using each one when appropriate.

```javascript
// app/initializers/easy-form-config.js
import config from 'ember-easy-form/config';

export default {
  name: 'easy-form-config',
  initialize: function () {
    config.registerWrapper('my-wrapper', {
      formClass: 'my-form',
      errorClass: 'my-error',
      hintClass: 'my-hint',
      labelClass: 'my-label'
    });
  }
};
```

You can replace the default wrapper simply by registering a wrapper named `default`.

When you register a wrapper, you don't have to inform all options. If some option is not defined, the default value will be used.

### Using a wrapper

To use a wrapper, define the `wrapper` option in the form. All elements inside the form will use the values defined in this wrapper.

```handlebars
{{#form-for controller wrapper="my-wrapper"}}
  {{input-for "firstName"}}
{{/form-for}}
```

### Default wrapper

The default wrapper contains the following values:

* `formClass` - "" (empty)
* `fieldErrorClass` - "fieldWithErrors"
* `inputClass` - "input"
* `errorClass` - "error"
* `hintClass` - "hint"
* `labelClass` - "" (empty)
* `submitClass` - "" (empty)
* `inputTemplate` - "components/easy-form/input-for"
* `errorTemplate` - "components/easy-form/error-field"
* `labelTemplate` - "components/easy-form/label-field"
* `hintTemplate` - "components/easy-form/hint-field"
* `submitButtonTemplate` - "components/easy-form/submit-button"

### Custom templates

It's possible to define the templates used by inputs, labels, errors and hints. Here is an example of `inputTemplate` for the Bootstrap Framework v2.

First, you must register a custom wrapper or register it with the name `default` to replace the default wrapper:

```javascript
// app/initializers/easy-form-config.js
import config from 'ember-easy-form/config';

export default {
  name: 'easy-form-config',
  initialize: function () {
    config.registerWrapper('twitter-bootstrap', {
      // Define the custom template
      inputTemplate: 'bootstrap-input',

      // Define a custom config used by the template
      controlsWrapperClass: 'controls',

      // Define the classes for the form, label, error...
      formClass: 'form-horizontal',
      fieldErrorClass: 'error',
      errorClass: 'help-inline',
      hintClass: 'help-block',
      labelClass: 'control-label',
      inputClass: 'control-group'
    });
  }
};
```

And then, you have to define the template used by this wrapper. In this example, the template name is `bootstrap-input`.

```handlebars
{{label-field property=propertyName text=labelText}}
<div class="{{unbound wrapperConfig.controlsWrapperClass}}">
  {{input-field property=propertyName inputOptions=inputOptions}}
  {{#if showError}}{{error-field property=propertyName}}{{/if}}
  {{#if hintText}}{{hint-field property=propertyName text=hintText}}{{/if}}
</div>
```

Your custom templates probably are going to be based on the templates defined by the `ember-easy-form` library, [here](./app/templates/components/easy-form) you can see them.

## Validations

When the `focusOut` event is triggered on input elements the associated
model will run the validations for that property. Any error messages
will appear in the associated `span.error` element. The containing `div`
will also have the class `.fieldWithErrors` applied. When the
validation passes the error message and classes are removed.

It is expected the controller have access to an `errors` objects (if
directly defined on the controller itself or on the `content` object)
and each key should correspond to the property in question. The value of
each key can be a string or an array. If an array the first value in the
array will be used for display.

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

This is partially influenced by [Ember FormBuilder](https://github.com/luan/ember-formbuilder) by [Luan Haddad Ricardo dos Santos](https://twitter.com/cfcluan)

[We are very thankful for the many contributors](https://github.com/dockyard/ember-easy-form/graphs/contributors)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this addon. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-easy-form/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com/ember-consulting) Inc. &copy; 2015

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
