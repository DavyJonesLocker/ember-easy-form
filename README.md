# Ember EasyForm #

[![Build Status](https://secure.travis-ci.org/dockyard/ember-easyForm.png?branch=master)](http://travis-ci.org/dockyard/ember-easyForm)

EasyForm for Ember

Development on this library will be on-going until `1.0`. We follow
`Semantic Versioning` so expect backwards incompatible changes between
minor version bumps. Patch version bumps will not introduce backwards
incompatible changes but older minor version will not be actively
supported.

## Getting a build ##

[Please choose from our list of builds for Ember-EasyForm](https://github.com/dockyard/ember-builds/tree/master/easyForm)

## Building yourself ##

You will require Ruby to be installed on your system. If it is please
run the following:

```bash
gem install bundler
git clone git://github.com/dockyard/ember-easyForm.git
cd ember-easyForm
bundle install
bundle exec rake dist
```

The builds will be in the `dist/` directory.

## Looking for help? ##

If it is a bug [please open an issue on
GitHub](https://github.com/dockyard/ember-easyForm/issues). If you need help using
the gem please ask the question on
[Stack Overflow](http://stackoverflow.com). Be sure to tag the
question with `DockYard` so we can find it.

## Usage ##

The `formFor` helper is used like so:

```handlebars
{{#formFor model}}
  {{input firstName}}
  {{input lastName}}
  {{input bio as="text"}}
{{/formFor}}
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
{{input secret as="hidden"}}
```

`ember-easyForm` will also try to determine the type automatically
based upon the property name:

```handlebars
{{input email}}
{{input password}}
```

This will set the first input with `type="email"` and the second with
`type="password"`

Pass the `label` option to set the label text:

```handlebars
{{input firstName label="Your Name"}}
```

Pass the `placeholder` option to set a placeholder:

```handlebars
{{input firstName placeholder="Enter your first name"}}
```

### Input Blocks

Inputs can be used in the default inline form as already seen or they can
be used as blocks such as:

```handlebars
{{#input firstName}}
  {{inputField firstName}}{{labelField firstName}}
  <br/>
  {{erroField firstName}}
{{/input}}
```

Inside the block you can add any markup you'd like and everything will
be wrapped inside the container `div` that is created by the original
`input`. You can should use the following helpers:

#### labelField

Renders the label field used by `input`. The first paramater is the
property, the remainder paramaters are options.

##### options

* `text` - the text for the label

```handlebars
{{labelField firstName text="Your first name"}}
```

#### inputField

Renders the input field used by `input`. The first parameter is the
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

```handlebars
{{inputField bio as="text"}}
{{inputField email}}
```

#### errorField

Renders the error span used by `input` where the first available
validation error message will be rendered. The first parameter will be
the property.

```handlebars
{{errorField firstName}}
```

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

[We are very thankful for the many contributors](https://github.com/dockyard/ember-easyForm/graphs/contributors)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this gem. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-easyForm/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com), LLC &copy; 2013

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
