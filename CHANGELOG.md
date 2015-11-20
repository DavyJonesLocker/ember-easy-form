## 1.0.0.beta.4

  * This library now supports Ember 1.13 and Ember 2.\*.
  * The `input` helper was renamed to `input-for`, and now it's a component.
  * The property name passed to the `input-for` component must be quoted (e.g. `{{input-for "name"}}`).
  * Previously, to use dynamic values it was necessary to use the `Binding` suffix (`{{input-for "name" placeholderBinding="someProperty"}}`). Now it's possible to use bindings without the suffix (`{{input-for "name" placeholder=someProperty}}`).
  * The support for internationalization was removed. Previously it was possible to use the `Translation` suffix (`{{input-for "firstName" labelTranslation="some-translation-key"}}`). Now you can use the i18n helper of your library of choice (`{{input-for "firstName" label=(t "some-translation-key")}}`).
  * The `select` view was deprecated on Ember 1.13 and removed on Ember 2.0. To support both versions we had to remove the direct support for it. You can define a custom input helper using any select component you want.
  * Previously, to use a property defined in the controller in the `input-for` helper, you had to define the property name with the suffix "controller.". Now you can define the `value` property of the `input-for` (`{{input-for "someProperty" value=somePropertyInTheControllerOrComponent}}`).
  * The `hint-field` component does not hide itself when the text is empty.
    Previously it was a helper that didn't render with an empty text. If you use it inside the block form of the `input-for` component, you have to remember to render it only when there is a text (`{{#if hintText}}{{hint-field ...}}{{/if}}`).
  * The name of some component templates changed. If you override the default templates, check their new names.
  * The content of all component templates changed. If you have custom templates, check the new templates.


## 1.0.0.beta.3

  * The project was converted to Ember-cli. Now you have to install it as an addon (`ember install ember-easy-form`).
  * To configure the addon you can't use the global variable `Ember.EasyForm.Config` anymore. Use the module `ember-easy-form/config` instead.
  * The template names changed, please check the new names in the README.

## 1.0.0.beta.2

  * Allow specifyin a name to the `{{input}}` helper. The provided name will be used
    as the name attribute in the generated `<input>` tag.
  * Use the property's name as the `<input>` tags `name` attribute.
  * Allow the model specified to `{{form-for}}` to be a regulare Javascript object (`{}`).
  * Change `EasyForm.Button` and `EasyForm.Submit` to use the models `isValid` flag to
    enable/disable the button.
  * Change `EasyForm.Button` and `EasyForm.Submit` to inherit from `EasyForm.BaseView`.
  * Use the model passed to the `{{form-for}}` helper as the scope for the properties
    provided to the `{{input}}` helper. This allows using something other than the
    controllers `model`/`content` as a forms model.
