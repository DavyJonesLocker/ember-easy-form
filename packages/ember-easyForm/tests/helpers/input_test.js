var model, Model, view, valid, container, controller, ErrorsObject, originalEmberWarn,
  set = Ember.set,
  get = Ember.get;

var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var originalLookup = Ember.lookup, lookup;
ErrorsObject = Ember.Object.extend({
  unknownProperty: function(property) {
    this.set(property, Ember.makeArray());
    return this.get(property);
  }
});

function prepare(){
  container = new Ember.Container();
  container.optionsForType('template', { instantiate: false });
  container.resolver = function(fullName) {
    var name = fullName.split(':')[1];
    return Ember.TEMPLATES[name];
  };
  model = {
    firstName: 'Brian',
    lastName: 'Cardarella'
  };
  controller = Ember.ObjectController.create({
    placeholder: 'A placeholder',
    label: 'A label',
    hint: 'A hint',
    prompt: 'A prompt'
  });
  controller.set('content', model);
}

function cleanup(){
  Ember.run(function() {
    view.destroy();
    view = null;
  });
  Ember.lookup = originalLookup;
}

module('input helpers', {
  setup: prepare,
  teardown: cleanup
});

var append = function(view) {
  Ember.run(function() {
    view.appendTo('#qunit-fixture');
  });
};

test('renders semantic form elements', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
  equal(view.$().find('input').val(), 'Brian');
  equal(view.$().find('input').attr('type'), 'text');
});

test('does not render error tag when context does not have errors object', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    controller: controller
  });
  append(view);
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));
  Ember.run(function() {
    view._childViews[0].trigger('focusOut');
  });
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));
});

test('renders error for invalid data', function() {
  model['errors'] = ErrorsObject.create();

  Ember.run(function() {
    get(model, 'errors.firstName').pushObject("can't be blank");
  });

  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    controller: controller
  });
  append(view);

  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));

  Ember.run(function() {
    view._childViews[0].trigger('input');
  });
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));

  Ember.run(function() {
    view._childViews[0].trigger('focusOut');
  });
  ok(view.$().find('div.fieldWithErrors').get(0));
  equal(view.$().find('span.error').text(), "can't be blank");

  Ember.run(function() {
    get(model, 'errors.firstName').clear();
  });
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));

  Ember.run(function() {
    view._childViews[0].trigger('focusOut');
  });
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));

  Ember.run(function() {
    get(model, 'errors.firstName').pushObject("can't be blank");
    view._childViews[0].trigger('input');
  });
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));

  Ember.run(function() {
    view._childViews[0].trigger('focusOut');
  });
  ok(view.$().find('div.fieldWithErrors').get(0));
  equal(view.$().find('span.error').text(), "can't be blank");
});

test('renders errors properly with dependent keys', function() {
  var passwordView, confirmationView;
  model['errors'] = ErrorsObject.create();
  model['_dependentValidationKeys'] = {
    passwordConfirmation: ['password']
  };

  Ember.run(function() {
    get(model,'errors.passwordConfirmation').pushObject("does not match password");
  });

  view = Ember.View.create({
    template: templateFor('{{input password}}{{input passwordConfirmation}}'),
    container: container,
    controller: controller
  });
  append(view);
  passwordView = view._childViews[0];
  confirmationView = view._childViews[1];

  ok(!confirmationView.$().hasClass('fieldWithErrors'));
  ok(!confirmationView.$().find('span.error').get(0));

  Ember.run(function() {
    passwordView.trigger('input');
  });
  ok(!confirmationView.$().hasClass('fieldWithErrors'));
  ok(!confirmationView.$().find('span.error').get(0));

  Ember.run(function() {
    passwordView.trigger('focusOut');
  });
  ok(!confirmationView.$().hasClass('fieldWithErrors'));
  ok(!confirmationView.$().find('span.error').get(0));

  Ember.run(function() {
    confirmationView.trigger('focusOut');
  });
  ok(confirmationView.$().hasClass('fieldWithErrors'));
  ok(confirmationView.$().find('span.error').get(0));

  Ember.run(function() {
    get(model, 'errors.passwordConfirmation').clear();
    confirmationView.trigger('focusOut');
  });
  ok(!confirmationView.$().hasClass('fieldWithErrors'));
  ok(!confirmationView.$().find('span.error').get(0));

  Ember.run(function() {
    get(model, 'errors.passwordConfirmation').pushObject("does not match password");
    passwordView.trigger('input');
  });
  ok(confirmationView.$().hasClass('fieldWithErrors'));
  ok(confirmationView.$().find('span.error').get(0));
});

test('allows label text to be set', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName label="Your First Name"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'Your First Name');
});

test('allows hint text to be set', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName hint="My hint text"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('span.hint').text(), 'My hint text');
});

test('does not show hint span when there is no hint', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('span.hint').length, 0);
});

test('block form for input', function() {
  view = Ember.View.create({
    template: templateFor('{{#input firstName}}{{label-field firstName}}{{input-field firstName}}{{error-field firstName}}{{/input}}'),
    container: container,
    controller: controller
  });
  append(view);

  var input = view.$().find('input');
  var label = view.$().find('label');

  equal(label.text(), 'First name');
  equal(input.val(), 'Brian');
  equal(input.attr('type'), 'text');
  equal(label.prop('for'), input.prop('id'));
});

test('block form for input without label', function() {
  view = Ember.View.create({
    template: templateFor('{{#input firstName}}{{input-field firstName}}{{/input}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').val(), 'Brian');
  equal(view.$().find('input').attr('type'), 'text');
});

test('sets input attributes property', function() {
  view = Ember.View.create({
    template: templateFor('{{input receiveAt as="email" placeholder="Your email"}}'),
    container: container,
    controller: controller
  });
  append(view);
  var input = view.$().find('input');
  equal(input.prop('type'), 'email');
  equal(input.prop('placeholder'), 'Your email');
});

test('binds label to input field', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    controller: controller
  });
  append(view);
  var input = view.$().find('input');
  var label = view.$().find('label');
  equal(input.prop('id'), label.prop('for'));
});

test('uses the wrapper config', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {inputClass: 'my-input', errorClass: 'my-error', fieldErrorClass: 'my-fieldWithErrors'});
  model['errors'] = ErrorsObject.create();

  Ember.run(function() {
    get(model,'errors.firstName').pushObject("can't be blank");
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for model wrapper="my_wrapper"}}{{input firstName}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0]._childViews[0].trigger('focusOut');
  });
  ok(view.$().find('div.my-input').get(0), 'inputClass not defined');
  ok(view.$().find('div.my-fieldWithErrors').get(0), 'fieldErrorClass not defined');
  ok(view.$().find('span.my-error').get(0), 'errorClass not defined');
});

test('uses the defined template name', function() {
  Ember.TEMPLATES['custom-input-template'] = templateFor('My custom template | {{label-field propertyBinding="view.property"}}');
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {inputTemplate: 'custom-input-template'});

  view = Ember.View.create({
    template: templateFor('{{#form-for model wrapper="my_wrapper"}}{{input firstName}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().text(), 'My custom template | First name');
});

test('sets input attributes property as bindings', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName placeholderBinding="placeholder" labelBinding="label" hintBinding="hint"}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('input').prop('placeholder'), controller.get('placeholder'));
  equal(view.$().find('label').text(), controller.get('label'));
  equal(view.$().find('.hint').text(), controller.get('hint'));

  Ember.run(function() {
    controller.setProperties({
      placeholder: 'Write your first name',
      label: 'First name (not a last name)',
      hint: 'Usually different than your last name'
    });
  });

  equal(view.$().find('input').prop('placeholder'), controller.get('placeholder'));
  equal(view.$().find('label').text(), controller.get('label'));
  equal(view.$().find('.hint').text(), controller.get('hint'));
});

test('sets select prompt property as bindings', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName as="select" labelBinding="label" hintBinding="hint" promptBinding="prompt"}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('option').text(), controller.get('prompt'));
  equal(view.$().find('label').text(), controller.get('label'));
  equal(view.$().find('.hint').text(), controller.get('hint'));

  Ember.run(function() {
    controller.setProperties({
      prompt: 'Select an option',
      label: 'First name (not a last name)',
      hint: 'Usually different than your last name'
    });
  });

  equal(view.$().find('option').text(), controller.get('prompt'));
  equal(view.$().find('label').text(), controller.get('label'));
  equal(view.$().find('.hint').text(), controller.get('hint'));
});

test('defaults the name property', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('input').prop('name'), "firstName");
});

test('allows specifying the name property', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName name="some-other-name"}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('input').prop('name'), "some-other-name");
});

test('scopes property lookup to model declared in form-for', function(){
  controller.set('someOtherModel', Ember.Object.create({firstName: 'Robert'}));

  view = Ember.View.create({
    template: templateFor('{{#form-for someOtherModel}}{{input firstName}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('input').val(), "Robert");
});

test('can specify a property outside of the model if a keyword is used as a prefix', function(){
  controller.set('someOtherModel', Ember.Object.create({firstName: 'Robert'}));

  view = Ember.View.create({
    template: templateFor('{{#form-for someOtherModel}}{{input controller.firstName}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('input').val(), "Brian");
});

test('select collection can use controller scope if prefix', function() {
  controller.set('someOtherModel', Ember.Object.create({ city: 'Ocala' }));

  controller.set('cities', Ember.A("Boston Ocala Portland".w()));

  view = Ember.View.create({
    template: templateFor('{{#form-for someOtherModel}}{{input city as="select" collection="controller.cities"}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$('option').text(), "BostonOcalaPortland");
  equal(view.$('option:selected').text(), "Ocala");
});

test('sets input as="date" attributes properly', function() {
  view = Ember.View.create({
    template: templateFor('{{input receiveAt as="date"}}'),
    container: container,
    controller: controller
  });
  append(view);
  var input = view.$().find('input');
  equal(input.prop('type'), 'date');
});

module('{{input}} without property argument', {
  setup: prepare,
  teardown: cleanup
});

test('allows using the {{input}} helper', function() {
  view = Ember.View.create({
    template: templateFor('{{input name="first-name"}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('input').prop('name'), "first-name");
});

test('{{ember-input}} uses the original Ember {{input}} helper', function(){
  view = Ember.View.create({
    template: templateFor('{{ember-input name="first-name"}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('input').prop('name'), "first-name");
});
