var model, view, container, controller, valid;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;

module('the formFor helper', {
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

var assertHTML = function(view, expectedHTML) {
  var html = view.$().html();

  // IE 8 (and prior?) add the \r\n
  html = html.replace(/<script[^>]*><\/script>/ig, '').replace(/[\r\n]/g, '');

  equal(html, expectedHTML);
};

test('renders a form element', function() {
  view = Ember.View.create({
    template: templateFor('{{#formFor model}}{{/formFor}}'),
    context: {
      model: {}
    }
  });
  append(view);
  ok(view.$().find('form').get(0));
});

test('sets the context within the form to the object', function() {
  view = Ember.View.create({
    template: templateFor('{{#formFor model}}{{value}}{{/formFor}}'),
    context: {
      model: { value: 'model' },
      value: 'view'
    }
  });
  append(view);
  equal(view.$().find('form').text(), 'model');
});

test('clicking with invalid model does not call submit action on controller', function() {
  valid = false;
  view = Ember.View.create({
    template: templateFor('{{#formFor model}}{{/formFor}}'),
    container: container,
    controller: controller,
    context: {
      model: model
    }
  });
  append(view);
  Ember.run(function() {
    view._childViews[1].trigger('submit');
  });
  equal(controller.get('count'), 0);
});

test('clicking with valid model calls submit action on controller', function() {
  valid = true;
  view = Ember.View.create({
    template: templateFor('{{#formFor model}}{{/formFor}}'),
    container: container,
    controller: controller,
    context: {
      model: model
    }
  });
  append(view);
  Ember.run(function() {
    view._childViews[1].trigger('submit');
  });
  equal(controller.get('count'), 1);
});
