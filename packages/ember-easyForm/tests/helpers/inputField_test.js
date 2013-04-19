var model, Model, view, container, controller, valid;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;
Model = Ember.Object.extend();

module('inputField helpers', {
  setup: function() {
    container = new Ember.Container();
    container.optionsForType('template', { instantiate: false });
    container.resolver = function(fullName) {
      var name = fullName.split(':')[1];
      return Ember.TEMPLATES[name];
    };
    model = Model.create({
      firstName: 'Brian',
      lastName: 'Cardarella'
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

test('render text input and sets value propertly', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField firstName}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'text');
  equal(view.$().find('input').val(), 'Brian');
});

test('allows setting of input attributes', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField secret type="hidden"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'hidden');
});

test('auto sets input type to password if name includes password', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField passwordConfirmation}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'password');
});

test('auto sets input type to password if forced to passwordr', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField token as="password"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'password');
});

test('auto sets input type to url if name includes url', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField url}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'url');
});

test('auto sets input type to url if forced to url', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField website as="url"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'url');
});

test('auto sets input type to color if name includes color', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField color}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'color');
});

test('auto sets input type to color if forced to color', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField hue as="color"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'color');
});

test('auto sets input type to tel if name includes tel', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField telephone}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to tel if forced to tel', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField phoneNumber as="tel"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to search if name includes search', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField search}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'search');
});

test('auto sets input type to search if forced to search', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField query as="search"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'search');
});

test('auto sets input type to email if name includes email', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField email}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'email');
});

test('auto sets input type to email if forced to email', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField receivedAt as="email"}}'),
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
    template: templateFor('{{inputField age}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'number');
});

test('auto sets input type to number if property is a number', function() {
  model.set('age', 30);
  view = Ember.View.create({
    template: templateFor('{{inputField age}}'),
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
    template: templateFor('{{inputField birthday}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'date');
});

test('auto sets input type to number if property is a number', function() {
  model.set('age', 30);
  view = Ember.View.create({
    template: templateFor('{{inputField age}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'number');
});

test('renders semantic form elements with text area', function() {
  view = Ember.View.create({
    template: templateFor('{{inputField firstName as="text"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('textarea').val(), 'Brian');
});

test('uses the custom input type when defined', function() {
  Ember.EasyForm.Config.registerInputType('my_input', Ember.EasyForm.TextArea);
  Ember.EasyForm.Config.registerInputType('another_input', Ember.EasyForm.TextField);
  view = Ember.View.create({
    template: templateFor('{{inputField firstName as="my_input"}}{{inputField lastName as="another_input"}}'),
    controller: controller
  });
  append(view);
  equal(view.$().find('textarea').val(), 'Brian');
  equal(view.$().find('input').val(), 'Cardarella');
});
