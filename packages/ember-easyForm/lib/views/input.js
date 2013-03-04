Ember.EasyForm.Input = Ember.View.extend({
  init: function() {
    this._super();
    if (!this.isBlock) {
      this.set('template', Ember.Handlebars.compile(this.fieldsForInput()));
    }
    if(this.get('context').get('errors') !== undefined) {
      this.reopen({
        error: function() {
          return this.get('context').get('errors').get(this.property) !== undefined;
        }.property('context.errors.'+this.property)
      });
    }
  },
  tagName: 'div',
  classNames: ['input', 'string'],
  classNameBindings: ['error:fieldWithErrors'],
  fieldsForInput: function() {
    return this.labelField()+this.inputField()+this.errorField();
  },
  labelField: function() {
    var options = this.label ? 'text="'+this.label+'"' : '';
    return '{{labelField '+this.property+' '+options+'}}';
  },
  inputField: function() {
    var options = '', key, inputOptions = ['type', 'placeholder'];
    for (var i = 0; i < inputOptions.length; i++) {
      key = inputOptions[i];
      if (this[key]) {
        if (typeof(this[key]) === 'boolean') {
          this[key] = key;
        }
        options = options.concat(''+key+'="'+this[inputOptions[i]]+'"');
      }
    }

    options.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

    return '{{inputField '+this.property+' '+options+'}}';
  },
  errorField: function() {
    var options = '';
    return '{{errorField '+this.property+' '+options+'}}';
  },
  focusOut: function() {
    if (this.get('context').get('content').validate) {
      this.get('context').get('content').validate(this.property);
    }
  }
});
