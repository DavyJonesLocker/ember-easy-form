var model, view, container, controller, valid;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;

module('button helpers', {
  setup: function() {
    container = new Ember.Container();
    container.optionsForType('template', { instantiate: false });
    container.resolver = function(fullName) {
      var name = fullName.split(':')[1];
      return Ember.TEMPLATES[name];
    };
    model = Ember.Object.create({
      firstName: 'Brian',
      lastName: 'Cardarella',
      validate: function() {
        return valid;
      },
    });
    var Controller = Ember.Controller.extend({
      actions: {
        submit: function() {
          this.incrementProperty('count');
        }
      }
    });
    controller = Controller.create();
    controller.set('count', 0);
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

test('renders button', function() {
  view = Ember.View.create({
    template: templateFor('{{button}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('button').text(), 'Submit');
  equal(view.$().find('button').prop('type'), 'submit');
});

test('custom value', function() {
  view = Ember.View.create({
    template: templateFor('{{button "Create"}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('button').text(), 'Create');
});

test('button disabled state is bound to models valid state', function() {
  Ember.run(function() {
    model.set('isValid', false);
    model.reopen({isInvalid: Ember.computed.not('isValid')});
  });
  view = Ember.View.create({
    template: templateFor('{{button}}'),
    container: container,
    context: model
  });
  append(view);
  equal(view.$().find('button').prop('disabled'), true);
  Ember.run(function() {
    model.set('isValid', true);
  });
  equal(view.$().find('button').prop('disabled'), false);
});
