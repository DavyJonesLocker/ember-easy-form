# Ember EasyForm #

EasyForm for Ember

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
    <label for="ember2">First name</label>
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
{{input secret type="hidden"}}
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

## Validations

When the `focusOut` event is triggered on input elements the associated
model will run the validations for that property. Any error messages
will appear in the associated `span.error` element. The containing `div`
will also have the class `.field_with_errors` applied. When the
validation passes the error message and classes are removed.

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

This is partially influenced by [Ember EasyForm](https://github.com/luan/ember-formbuilder) by [Luan Haddad Ricardo dos Santos](https://twitter.com/cfcluan)

[We are very thankful for the many contributors](https://github.com/dockyard/ember-easyForm/graphs/contributors)

## Versioning ##

This gem follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this gem. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-easyForm/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com), LLC &copy; 2013

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
