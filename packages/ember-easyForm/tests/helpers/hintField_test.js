var model, Model, view, container, controller, valid;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;
Model = Ember.Object.extend();

module('hintField helpers', {
  setup: function() {
    container = new Ember.Container();
    container.optionsForType('template', { instantiate: false });
    container.resolver = function(fullName) {
      var name = fullName.split(':')[1];
      return Ember.TEMPLATES[name];
    };
    model = Model.create({
      firstName: 'Brian',
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

test('renders a hint field with custom text', function() {
  view = Ember.View.create({
    template: templateFor('{{hintField firstName text="Some text"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('span.hint').text(), 'Some text');
});

test('does not render a hint field without custom text', function() {
  view = Ember.View.create({
    template: templateFor('{{hintField firstName}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('span.hint').length, 0, 'The hint element should not have been created');
});


test('uses the wrapper config', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {hintClass: 'my-hint'});
  view = Ember.View.create({
    template: templateFor('{{#formFor controller wrapper=my_wrapper}}{{hintField firstName text="Some text"}}{{/formFor}}'),
    container: container,
    controller: controller
  });
  append(view);
  ok(view.$().find('span.my-hint').get(0), 'hintClass not defined');
});
