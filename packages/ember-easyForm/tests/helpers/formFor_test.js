var model, Model, view, container, controller, valid;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;
Model = Ember.Object.extend({
  validate: function() {
    var promise = new Ember.Deferred();
    promise.resolve();
    return promise;
  }
});

module('the formFor helper', {
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
    controller.set('count', 0);
    controller.submit = function() { return this.incrementProperty('count'); };
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
    template: templateFor('{{#formFor controller}}{{/formFor}}'),
    controller: controller
  });
  append(view);
  ok(view.$().find('form').get(0));
});

test('uses the defined wrapper', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {formClass: 'my-form-class'});
  view = Ember.View.create({
    template: templateFor('{{#formFor controller wrapper=my_wrapper}}{{/formFor}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('form').attr('class'), 'ember-view my-form-class');
});

asyncTest('submitting with invalid model does not call submit action on controller', function() {
  Ember.run(function() {
    model.set('isValid', false);
    view = Ember.View.create({
      template: templateFor('{{#formFor controller}}{{/formFor}}'),
      container: container,
      controller: controller
    });
    append(view);
    view._childViews[0].trigger('submit');
    setTimeout(function() {
      equal(controller.get('count'), 0);
      start();
    }, 50);
  });
});

asyncTest('submitting with valid model calls submit action on controller', function() {
  model.set('isValid', true);
  view = Ember.View.create({
    template: templateFor('{{#formFor controller}}{{/formFor}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  setTimeout(function() {
    equal(controller.get('count'), 1);
    start();
  }, 50);
});

asyncTest('submitting with model that does not have validate method', function() {
  delete model.validate;
  Ember.run(function() {
    model.set('isValid', true);
    view = Ember.View.create({
      template: templateFor('{{#formFor controller}}{{/formFor}}'),
      container: container,
      controller: controller
    });
    append(view);
    view._childViews[0].trigger('submit');
    setTimeout(function() {
      equal(controller.get('count'), 1);
      start();
    }, 50);
  });
});
