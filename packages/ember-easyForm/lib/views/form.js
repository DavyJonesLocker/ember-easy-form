Ember.EasyForm.Form = Ember.EasyForm.BaseView.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: 'novalidate',
  wrapper: 'default',
  init: function() {
    this._super();
    this.classNames.push(this.getWrapperConfig('formClass'));
    this.action = this.action || 'submit';
  },
  submit: function(event) {
    var _this = this,
        promise;

    if (event) {
      event.preventDefault();
    }

    if (Ember.isNone(this.get('formForModel.validate'))) {
      this.get('controller').send(this.action);
    } else {
      if (!Ember.isNone(this.get('formForModel').validate)) {
        promise = this.get('formForModel').validate();
      } else {
        promise = this.get('formForModel.content').validate();
      }
      promise.then(function() {
        if (_this.get('formForModel.isValid')) {
          _this.get('controller').send(_this.action);
        } else {
          showAllErrors(_this);
        }
      }, function() {
        showAllErrors(_this);
      });
    }
  }
});


function showAllErrors(view) {
  if (view.isDestroyed) {
    return;
  }

  if (view.showValidationError && view.focusOut) {
    view.focusOut();
  }

  var views = Ember.get(view, '_childViews');
  if (views) {
    views.forEach(function(view) {
      showAllErrors(view);
    });
  }
}

