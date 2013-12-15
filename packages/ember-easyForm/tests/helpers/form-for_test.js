var model, view, container, controller, valid,
  get = Ember.get,
  set = Ember.set;

var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;
var validateFunction = function() {
  var promise = new Ember.Deferred();
  promise.resolve();
  return promise;
};

module('the form-for helper', {
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
      errors: Ember.Object.create(),
      validate: validateFunction
    };
    var Controller = Ember.ObjectController.extend({
      actions: {
        submit: function() {
          this.incrementProperty('count');
        },
        bigSubmit: function() {
          this.incrementProperty('count', 2);
        }
      }
    });
    controller = Controller.create();
    controller.set('content', model);
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

test('renders a form element', function() {
  view = Ember.View.create({
    template: templateFor('{{#form-for model}}{{/form-for}}'),
    controller: controller
  });
  append(view);
  ok(view.$().find('form').get(0));
});

test('uses the defined wrapper', function() {
  Ember.EasyForm.Config.registerWrapper('my_wrapper', {formClass: 'my-form-class'});
  view = Ember.View.create({
    template: templateFor('{{#form-for model wrapper="my_wrapper"}}{{/form-for}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('form').attr('class'), 'ember-view my-form-class');
});

test('submitting with invalid model does not call submit action on controller', function() {
  Ember.run(function() {
    set(model, 'isValid', false);
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for model}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  equal(controller.get('count'), 0);
});

test('submitting with valid model calls submit action on controller', function() {
  Ember.run(function() {
    set(model, 'isValid', true);
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for model}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  equal(controller.get('count'), 1);
});

test('submitting with valid controller calls submit action on controller', function() {
  controller.reopen({
    validate: function() {
      var promise = new Ember.Deferred();
      promise.resolve();
      return promise;
    }
  });
  Ember.run(function() {
    controller.set('isValid', true);
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for model}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  equal(controller.get('count'), 1);
});

test('can override the action called by submit on the controller', function() {
  Ember.run(function() {
    set(model, 'isValid', true);
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for model action="bigSubmit"}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  equal(controller.get('count'), 2);
});

test('submitting with model that does not have validate method', function() {
  var model = Ember.Object.create();
  Ember.run(function() {
    controller.set('content', model);
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for model}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  equal(controller.get('count'), 1);
});

test('submitting with ember-data model without validations can call submit action on controller', function() {
  Ember.run(function() {
    set(model, 'isValid', false);
    model.validate = undefined;
  });
  view = Ember.View.create({
    template: templateFor('{{#form-for model}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);
  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  equal(controller.get('count'), 1);
});

test('uses the specified model as the basis for {{input}} property lookup', function() {
  view = Ember.View.create({
    template: templateFor('{{#form-for theModel}}{{input foo name="easy-input"}} <div id="asl">{{foo}}</div> {{input id="ember-input" value=foo}}{{/form-for}}'),
    container: container,
    controller: Ember.Controller.create({
      theModel: { foo: "LOL" },
      foo: "BORING"
    })
  });
  append(view);

  equal(view.$('input[name="easy-input"]').val(), "LOL", "easy-input uses form-for's model as its context for looking up its property");
  equal(view.$('#ember-input').val(), "BORING", "vanilla ember inputs are unaffected by form-for");
  equal(view.$('#asl').text(), "BORING", "form-for doesn't change context for plain ol bindings");
});

test('uses the specified models validation object', function() {
  model = {
    theModel: {
      validate: validateFunction
    },
    count: 0
  };
  controller.set('content', model);
  view = Ember.View.create({
    template: templateFor('{{#form-for theModel}}{{input foo}}{{/form-for}}'),
    container: container,
    controller: controller
  });
  append(view);

  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  equal(controller.get('count'), 0);

  set(model, 'theModel.isValid', true);
  Ember.run(function() {
    view._childViews[0].trigger('submit');
  });
  equal(controller.get('count'), 1);
});
