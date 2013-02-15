var model, view, container, controller, valid;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;

module('submit helpers', {
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
      validate: function() {
        return valid;
      },
      errors: Ember.Object.create()
    };
    controller = Ember.Controller.create();
    controller.set('count', 0);
    controller.set('submit', function() { this.set('count', this.get('count') + 1); });
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

test('renders submit button', function() {
  view = Ember.View.create({
    template: templateFor('{{submit}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('input').prop('value'), 'Submit');
  equal(view.$().find('input').prop('type'), 'submit');
});

test('custom value', function() {
  view = Ember.View.create({
    template: templateFor('{{submit "Create"}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('input').prop('value'), 'Create');
});

test('clicking with invalid model does not call submit action on controller', function() {
  valid = false;
  view = Ember.View.create({
    template: templateFor('{{submit "Create"}}'),
    container: container,
    controller: controller,
    context: model
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('onClick');
  });
  equal(controller.get('count'), 0);
});

test('clicking with valid model calls submit action on controller', function() {
  valid = true;
  view = Ember.View.create({
    template: templateFor('{{submit "Create"}}'),
    container: container,
    controller: controller,
    context: model
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('onClick');
  });
  equal(controller.get('count'), 1);
});
