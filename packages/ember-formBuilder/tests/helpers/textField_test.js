var view;
var templateFor = function(template) {
  return Ember.Handlebars.compile(template);
};

module('the textField helper', {
  teardown: function() {
    Ember.run(function() {
      view.destroy();
      view = null;
    });
  }
});

var append = function(view) {
  Ember.run(function() {
    view.appendTo('#qunit-fixture');
  });
};

test('renders a text field', function() {
  view = Ember.View.create({
    template: templateFor('{{textField firstName}}'),
    context: {
      firstName: 'Brian',
      constructor: {
        toString: function() {
          return 'App.User';
        }
      }
    }
  });
  append(view);
  equal(view.$().find('input').val(), 'Brian');
  equal(view.$().find('input').prop('type'), 'text');
});
