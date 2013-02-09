var model, view;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};
var original_lookup = Ember.lookup, lookup;

module('the formFor helper', {
  setup: function() {
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
