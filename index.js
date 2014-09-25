'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-easyForm',

  treeFor: function(name) {
    if (name !== 'vendor') { return; }

    return path.join('node_modules', 'ember-cli-easyForm', 'dist');
  },

  included: function(app) {
    this._super.included(app);

    app.import('vendor/ember-easyForm.js');
  }
};
