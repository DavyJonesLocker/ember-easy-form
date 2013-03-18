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
  equal(view.$().find('span.error').text(), '');
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
    template: templateFor('{{input receiveAt type="email" placeholder="Your email"}}'),
    controller: controller
  });
  append(view);
  var input = view.$().find('input');
  equal(input.prop('type'), 'email');
  equal(input.prop('placeholder'), 'Your email');
});
