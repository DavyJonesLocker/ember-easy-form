var model, view, container, controller, valid, countries,
  get = Ember.get,
  set = Ember.set;

var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;

module('input-field helpers', {
  setup: function() {
    container = new Ember.Container();
    container.optionsForType('template', { instantiate: false });
    container.resolver = function(fullName) {
      var name = fullName.split(':')[1];
      return Ember.TEMPLATES[name];
    };
    countries = [{ id: 1, name: 'South Aftica' }, { id: 2, name: 'United States' }];

    model = {
      firstName: 'Brian',
      lastName: 'Cardarella',
      country: countries[1]
    };

    controller = Ember.ObjectController.create();
    controller.set('content', model);
    controller.set('optionsForCountry', countries);
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
    template: templateFor('{{input-field firstName}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'text');
  equal(view.$().find('input').val(), 'Brian');
});

test('allows setting of input attributes', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field secret type="hidden"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'hidden');
});

test('auto sets input type to password if name includes password', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field passwordConfirmation}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'password');
});

test('auto sets input type to password if forced to password', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field token as="password"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'password');
});

test('auto sets input type to url if name includes url', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field url}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'url');
});

test('auto sets input type to url if forced to url', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field website as="url"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'url');
});

test('auto sets input type to color if name includes color', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field color}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'color');
});

test('auto sets input type to color if forced to color', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field hue as="color"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'color');
});

test('auto sets input type to tel if name includes tel', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field telephone}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to tel if forced to tel', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field phoneNumber as="tel"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'tel');
});

test('auto sets input type to search if name includes search', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field search}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'search');
});

test('auto sets input type to search if forced to search', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field query as="search"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'search');
});

test('auto sets input type to email if name includes email', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field email}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'email');
});

test('auto sets input type to email if forced to email', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field receivedAt as="email"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'email');
});

test('auto sets input type to number if property meta attribute is a number', function() {
  model['metaForProperty'] = function(property) {
    var obj = { 'type': 'number' };
    if (property === 'age') {
      return obj;
    }
  };
  set(model,'age', 30);
  view = Ember.View.create({
    template: templateFor('{{input-field age}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'number');
});

test('auto sets input type to number if property is a number', function() {
  set(model,'age', 30);
  view = Ember.View.create({
    template: templateFor('{{input-field age}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'number');
});

test('auto sets input type to date if property meta attribute is a date', function() {
  model['metaForProperty'] = function(property) {
    var obj = { 'type': 'date' };
    if (property === 'birthday') {
      return obj;
    }
  };
  set(model,'birthday', new Date());
  view = Ember.View.create({
    template: templateFor('{{input-field birthday}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'date');
});

test('auto sets input type to checkbox if forced to checkbox', function() {
  set(model,'alive', true);
  view = Ember.View.create({
    template: templateFor('{{input-field alive as="checkbox"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'checkbox');
  equal(view.$().find('input').is(':checked'), true);
});

test('auto sets input type to checkbox if property meta attribute is a boolean', function() {
  model['metaForProperty'] = function(property) {
    var obj = { 'type': 'boolean' };
    if (property === 'old') {
      return obj;
    }
  };
  set(model,'old', false);
  view = Ember.View.create({
    template: templateFor('{{input-field old}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'checkbox');
});

test('auto sets input type to number if property is a number', function() {
  set(model,'age', 30);
  view = Ember.View.create({
    template: templateFor('{{input-field age}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'number');
});

test('does not fail if a controller content constructor does not respond to proto', function() {
  controller.set('content', []);
  view = Ember.View.create({
    template: templateFor('{{input-field name}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'text');
});

test('renders semantic form elements with text area', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field firstName as="text"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('textarea').val(), 'Brian');
});

test('uses the custom input type when defined', function() {
  Ember.EasyForm.Config.registerInputType('my_input', Ember.EasyForm.TextArea);
  Ember.EasyForm.Config.registerInputType('another_input', Ember.EasyForm.TextField);
  view = Ember.View.create({
    template: templateFor('{{input-field firstName as="my_input"}}{{input-field lastName as="another_input"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('textarea').val(), 'Brian');
  equal(view.$().find('input').val(), 'Cardarella');
});

test('generates a select input and options', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field country as="select" collection="optionsForCountry"}}'),
    container: container,
    controller: controller
  });

  append(view);
  equal(view.$().find('select').length, 1);
  equal(view.$().find('select option').length, 2);
});

test('generates a select input and options with prompt', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field country as="select" collection="optionsForCountry" prompt="Select Country"}}'),
    container: container,
    controller: controller
  });

  append(view);
  equal(view.$().find('select').length, 1);
  equal(view.$().find('select option').length, 3);
});

test('generates a select input with correct selection', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field country as="select" collection="optionsForCountry" selection="country" optionValuePath="content.id" optionLabelPath="content.name"}}'),
    container: container,
    controller: controller
  });

  append(view);
  ok(view.$().find('select option:selected').html().match(/United States/));
});

test('generates a select input with correct selection when no selection is specified', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field country as="select" collection="optionsForCountry" optionValuePath="content.id" optionLabelPath="content.name"}}'),
    container: container,
    controller: controller
  });

  append(view);
  ok(view.$().find('select option:selected').html().match(/United States/));
});

test('generates a select input correct value', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field country as="select" collection="optionsForCountry" value="country.id" optionValuePath="content.id" optionLabelPath="content.name"}}'),
    container: container,
    controller: controller
  });

  append(view);
  ok(view.$().find('select option:selected').html().match(/United States/));
});

test('auto sets input type to date', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field receivedAt as="date"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'date');
});

test('auto sets input type to time', function() {
  view = Ember.View.create({
    template: templateFor('{{input-field receivedAt as="time"}}'),
    container: container,
    controller: controller
  });
  append(view);
  equal(view.$().find('input').attr('type'), 'time');
});
