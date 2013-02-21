var model, view, container;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;

module('input helpers', {
  setup: function() {
    container = new Ember.Container();
    container.optionsForType('template', { instantiate: false });
    container.resolver = function(fullName) {
      var name = fullName.split(':')[1];
      return Ember.TEMPLATES[name];
    };
    model = {
      firstName: 'Brian',
      lastName: 'Cardarella',
      validate: function(property) {
        this.errors.set(property, 'Error!');
      },
      errors: Ember.Object.create()
    };
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
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
  equal(view.$().find('input').val(), 'Brian');
  equal(view.$().find('input').attr('type'), 'text');
});

test('renders semantic form elements with text area', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName as="text"}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
  equal(view.$().find('textarea').val(), 'Brian');
});

test('renders error for invalid data', function() {
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    context: model
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
  var model = {
    firstName: 'Brian',
    lastName: 'Cardarella'
  };
  view = Ember.View.create({
    template: templateFor('{{input firstName}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('label').text(), 'First name');
  equal(view.$().find('input').val(), 'Brian');
  equal(view.$().find('input').attr('type'), 'text');
});

test('allows label text to be set', function() {
  var model = {
    firstName: 'Brian',
    lastName: 'Cardarella'
  };
  view = Ember.View.create({
    template: templateFor('{{input firstName label="Your First Name"}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('label').text(), 'Your First Name');
});

test('allows setting of input attributes', function() {
  var model = {
    secret: ''
  };
  view = Ember.View.create({
    template: templateFor('{{input secret type="hidden"}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'hidden');
});

test('auto sets input type to password if name includes password', function() {
  var model = {
    passwordConfirmation: ''
  };
  view = Ember.View.create({
    template: templateFor('{{input passwordConfirmation}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'password');
});

test('auto sets input type to email if name includes email', function() {
  var model = {
    email: ''
  };
  view = Ember.View.create({
    template: templateFor('{{input email}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'email');
});
