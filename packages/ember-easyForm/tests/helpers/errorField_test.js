var model, Model, view, container, controller, valid;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;
Model = Ember.Object.extend();

module('errorField helpers', {
  setup: function() {
    container = new Ember.Container();
    container.optionsForType('template', { instantiate: false });
    container.resolver = function(fullName) {
      var name = fullName.split(':')[1];
      return Ember.TEMPLATES[name];
    };
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

test('error helper should bind to first error message in array', function() {
  view = Ember.View.create({
    template: templateFor('{{errorField firstName}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('span.error').text(), '');
  Ember.run(function() {
    model.errors.set('firstName', ["can't be blank"]);
  });
  equal(view.$().find('span.error').text(), "can't be blank");
  Ember.run(function() {
    model.errors.set('firstName', ['is invalid', "can't be blank"]);
  });
  equal(view.$().find('span.error').text(), 'is invalid');
  Ember.run(function() {
    model.errors.set('firstName', []);
  });
  equal(view.$().find('span.error').text(), '');
  Ember.run(function() {
    model.errors.set('firstName', undefined);
  });
  equal(view.$().find('span.error').text(), '');
});

test('uses the wrapper config', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {errorClass: 'my-error'});
  view = Ember.View.create({
    template: templateFor('{{#formFor controller wrapper=my_wrapper}}{{errorField firstName}}{{/formFor}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    model.errors.set('firstName', ["can't be blank"]);
  });
  ok(view.$().find('span.my-error').get(0), 'errorClass not defined');
});
