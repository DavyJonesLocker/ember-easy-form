# Ember FormBuilder #

FormBuilder for Ember

## Looking for help? ##

If it is a bug [please open an issue on
GitHub](https://github.com/dockyard/ember-formBuilder/issues). If you need help using
the gem please ask the question on
[Stack Overflow](http://stackoverflow.com). Be sure to tag the
question with `DockYard` so we can find it.

## Usage ##

The `formFor` helper is used like so:

```js
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
    <label for="ember1">First name</label>
    <input id="ember1" type="text"/>
    <span class="error"></span>
  </div>
  <div class="input string">
    <label for="ember1">Bio</label>
    <textarea id="ember1"></textarea>
    <span class="error"></span>
  </div>
</form>
```

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

[We are very thankful for the many contributors](https://github.com/dockyard/ember-formBuilder/graphs/contributors)

## Versioning ##

This gem follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this gem. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-formBuilder/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com), LLC &copy; 2013

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
