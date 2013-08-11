Ember.EasyForm.Label = Ember.EasyForm.BaseView.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  labelText: function() {
    return this.get('text') || this.get('property').underscore().split('_').join(' ').capitalize();
  }.property('text', 'property'),
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('labelClass'));
  },
  render: function(buffer) {
    buffer.push(Handlebars.Utils.escapeExpression(this.get('labelText')));
  },
  labelTextChanged: function() {
    this.rerender();
  }.observes('labelText')
});
