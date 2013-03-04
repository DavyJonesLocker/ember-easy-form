var model, Model, view, container, controller, valid;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;
Model = Ember.Object.extend();

module('labelField helpers', {
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

test('renders a label field', function() {
  view = Ember.View.create({
    template: templateFor('{{labelField firstName}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
});

test('renders a label field with custom text', function() {
  view = Ember.View.create({
    template: templateFor('{{labelField firstName text="Your first name"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'Your first name');
});
