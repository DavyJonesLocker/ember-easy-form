var model, Model, view, valid, container, controller;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;
Model = Ember.Object.extend({
  validate: function(property) {
    this.errors.set(property, 'Error!');
  },
});

module('input helpers', {
  setup: function() {
    // container = new Ember.Container();
    // container.optionsForType('template', { instantiate: false });
    // container.resolver = function(fullName) {
      // var name = fullName.split(':')[1];
      // return Ember.TEMPLATES[name];
    // };
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

test('renders semantic form elements with text area', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName as="text"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
  equal(view.$().find('textarea').val(), 'Brian');
});

test('renders error for invalid data', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    controller: controller
  });
  append(view);
  ok(!view.$().find('div.field_with_errors').get(0));
  equal(view.$().find('span.error').text(), '');
  Ember.run(function() {
    view._childViews[0].trigger('focusOut');
  });
  ok(view.$().find('div.field_with_errors').get(0));
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

test('allows setting of input attributes', function() {
  view = Ember.View.create({
    template: templateFor('{{input secret type="hidden"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'hidden');
});

test('auto sets input type to password if name includes password', function() {
  view = Ember.View.create({
    template: templateFor('{{input passwordConfirmation}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'password');
});

test('auto sets input type to email if name includes email', function() {
  view = Ember.View.create({
    template: templateFor('{{input email}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'email');
});

test('auto sets input type to number if property meta attribute is a number', function() {
   model.reopen({ 
    metaForProperty: function(property) {
      var obj = { 'type': 'number' };
      if (property === 'age') {
        return obj;
      }
    }
  });
  model.set('age', 30);
  view = Ember.View.create({
    template: templateFor('{{input age}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'number');
});

test('auto sets input type to number if property is a number', function() {
  model.set('age', 30);
  view = Ember.View.create({
    template: templateFor('{{input age}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'number');
});

test('auto sets input type to date if property meta attribute is a date', function() {
  model.reopen({
    metaForProperty: function(property) {
      var obj = { 'type': 'date' };
      if (property === 'birthday') {
        return obj;
      }
    }
  });
  model.set('birthday', new Date());
  view = Ember.View.create({
    template: templateFor('{{input birthday}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'date');
});

test('auto sets input type to number if property is a number', function() {
  model.set('birthday', new Date());
  view = Ember.View.create({
    template: templateFor('{{input birthday}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'date');
});
