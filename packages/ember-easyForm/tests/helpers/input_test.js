var model, Model, view, valid, container, controller;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;
Model = Ember.Object.extend({
  validate: function(property) {
    this.errors.set(property, 'Error!');
  }
});

module('input helpers', {
  setup: function() {
    model = Model.create({
      firstName: 'Brian',
      lastName: 'Cardarella',
      errors: Ember.Object.create()
    });
    controller = Ember.ObjectController.create();
    controller.set('content', model);
  },
  teardown: function() {
    Ember.run(function() {
      view.destroy();
      view = null;
    });
    Ember.lookup = original_lookup;
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
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
  equal(view.$().find('input').val(), 'Brian');
  equal(view.$().find('input').attr('type'), 'text');
});

test('renders error for invalid data', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    controller: controller
  });
  append(view);
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));
  Ember.run(function() {
    view._childViews[0].trigger('focusOut');
  });
  ok(view.$().find('div.fieldWithErrors').get(0));
  equal(view.$().find('span.error').text(), 'Error!');
});

test('renders semantic form elements when model does not have validation support', function() {
  var model = Model.create({
    firstName: 'Brian',
    lastName: 'Cardarella'
  });

  model.validate = undefined;
  controller.set('content', model);
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
  equal(view.$().find('input').val(), 'Brian');
  equal(view.$().find('input').attr('type'), 'text');
});

test('allows label text to be set', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName label="Your First Name"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'Your First Name');
});

test('allows hint text to be set', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName hint="My hint text"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('span.hint').text(), 'My hint text');
});

test('block form for input', function() {
  view = Ember.View.create({
    template: templateFor('{{#input firstName}}{{labelField firstName}}{{inputField firstName}}{{errorField firstName}}{{/input}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
  equal(view.$().find('input').val(), 'Brian');
  equal(view.$().find('input').attr('type'), 'text');
});

test('sets input attributes propertly', function() {
  view = Ember.View.create({
    template: templateFor('{{input receiveAt as="email" placeholder="Your email"}}'),
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
    controller: controller
  });
  append(view);
  var input = view.$().find('input');
  var label = view.$().find('label');
  equal(input.prop('id'), label.prop('for'));
});

test('uses the wrapper config', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {inputClass: 'my-input', errorClass: 'my-error', fieldErrorClass: 'my-fieldWithErrors'});
  view = Ember.View.create({
    template: templateFor('{{#formFor controller wrapper=my_wrapper}}{{input firstName}}{{/formFor}}'),
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
  view = Ember.View.create({
    template: templateFor('{{#formFor controller wrapper=my_wrapper}}{{input firstName hint="my hint"}}{{/formFor}}'),
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
    template: templateFor('{{#formFor controller wrapper=my_wrapper}}{{input firstName hint="my hint"}}{{/formFor}}'),
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
    controller: controller
  });
  append(view);
  var textarea = view.$().find('textarea');
  equal(textarea.attr('class'), 'ember-view ember-text-area span5');
  equal(textarea.attr('rows'), '2');
});

test('sets errors in models created without the "errors" object', function(){
  delete model.errors;

  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    controller: controller
  });
  append(view);
  ok(!view.$().find('div.fieldWithErrors').get(0));
  ok(!view.$().find('span.error').get(0));
  Ember.run(function() {
    model.set('errors', {firstName: 'Some error!'});
  });
  ok(view.$().find('div.fieldWithErrors').get(0));
  equal(view.$().find('span.error').text(), 'Some error!');
});
