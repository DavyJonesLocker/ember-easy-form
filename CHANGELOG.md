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
