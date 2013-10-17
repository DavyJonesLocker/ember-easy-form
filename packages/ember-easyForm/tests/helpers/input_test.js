var model, Model, view, valid, container, controller, ErrorsObject;
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

module('input helpers', {
  setup: function() {
    container = new Ember.Container();
    container.optionsForType('template', { instantiate: false });
    container.resolver = function(fullName) {
      var name = fullName.split(':')[1];
      return Ember.TEMPLATES[name];
    };
    model = Ember.Object.create({
      firstName: 'Brian',
      lastName: 'Cardarella'
    });
    controller = Ember.ObjectController.create({
      placeholder: 'A placeholder',
      label: 'A label',
      hint: 'A hint',
      prompt: 'A prompt'
    });
    controller.set('content', model);
  },
  teardown: function() {
    Ember.run(function() {
      view.destroy();
      view = null;
    });
    Ember.lookup = originalLookup;
  }
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
  model.reopen({
    errors: ErrorsObject.create()
  });

  Ember.run(function() {
    model.get('errors.firstName').pushObject("can't be blank");
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
    model.get('errors.firstName').clear();
  });
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));

  Ember.run(function() {
    view._childViews[0].trigger('focusOut');
  });
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));

  Ember.run(function() {
    model.get('errors.firstName').pushObject("can't be blank");
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
  model.reopen({
    errors: ErrorsObject.create(),
    _dependentValidationKeys: {
      passwordConfirmation: ['password']
    }
  });

  Ember.run(function() {
    model.get('errors.passwordConfirmation').pushObject("does not match password");
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
    model.get('errors.passwordConfirmation').clear();
    confirmationView.trigger('focusOut');
  });
  ok(!confirmationView.$().hasClass('fieldWithErrors'));
  ok(!confirmationView.$().find('span.error').get(0));

  Ember.run(function() {
    model.get('errors.passwordConfirmation').pushObject("does not match password");
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
  equal(view.$().find('label').text(), 'First name');
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
  model.reopen({
    errors: ErrorsObject.create()
  });

  Ember.run(function() {
    model.get('errors.firstName').pushObject("can't be blank");
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for controller wrapper=my_wrapper}}{{input firstName}}{{/form-for}}'),
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

test('wraps controls when defined', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {wrapControls: true, controlsWrapperClass: 'my-wrapper'});
  model.reopen({
    errors: ErrorsObject.create()
  });

  Ember.run(function() {
    model.get('errors.firstName').pushObject("can't be blank");
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for controller wrapper=my_wrapper}}{{input firstName hint="my hint"}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0]._childViews[0].trigger('focusOut');
  });
  var controlsWrapper = view.$().find('div.my-wrapper');
  ok(controlsWrapper.get(0), 'controls were not wrapped');
  ok(controlsWrapper.find('input').get(0), 'the input field should be inside the wrapper');
  ok(controlsWrapper.find('span.error').get(0), 'the error should be inside the wrapper');
  ok(controlsWrapper.find('span.hint').get(0), 'the hint should be inside the wrapper');
});

test('does not wrap controls when not defined', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {wrapControls: false, controlsWrapperClass: 'my-wrapper'});
  view = Ember.View.create({
    template: templateFor('{{#form-for controller wrapper=my_wrapper}}{{input firstName hint="my hint"}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0]._childViews[0].trigger('focusOut');
  });
  equal(view.$().find('div.my-wrapper').length, 0, 'should not create the controls wrapper');
});

test('passes the inputConfig to the input field', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName as=text inputConfig="class:span5;rows:2"}}'),
    container: container,
    controller: controller
  });
  append(view);
  var textarea = view.$().find('textarea');
  equal(textarea.attr('class'), 'ember-view ember-text-area span5');
  equal(textarea.attr('rows'), '2');
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

test('allows to use computed properties defined in the Input view', function() {
  Ember.EasyForm.Input.reopen({
    placeholder: function() {
      return 'MyPlaceholder';
    }.property(),
    label: function() {
      return 'MyLabel';
    }.property(),
    hint: function() {
      return 'MyHint';
    }.property(),
    inputConfig: function() {
      return 'class:MyClass';
    }.property()
  });

  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('input').prop('placeholder'), 'MyPlaceholder');
  equal(view.$().find('label').text(), 'MyLabel');
  equal(view.$().find('.hint').text(), 'MyHint');
  ok(view.$().find('input').hasClass('MyClass'));
});

test('allows to override the computed property defined in the Input view', function() {
  Ember.EasyForm.Input.reopen({
    label: function() {
      return 'MyLabel';
    }.property()
  });

  view = Ember.View.create({
    template: templateFor('{{input firstName label="MyFirstName"}}'),
    container: container,
    controller: controller
  });
  append(view);

  equal(view.$().find('label').text(), 'MyFirstName');
});
