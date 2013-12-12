## 1.0.0.beta.2

  * Allow specifyin a name to the `{{input}}` helper. The provided name will be used
    as the name attribute in the generated `<input>` tag.
  * Use the property's name as the `<input>` tags `name` attribute.
  * Allow the model specified to `{{form-for}}` to be a regulare Javascript object (`{}`).
  * Change `EasyForm.Button` and `EasyForm.Submit` to use the models `isValid` flag to
    enable/disable the button.
