/*
 * Implements (painfully) common pattern where a models params should be
 * filtered down to a smaller list before sumitting.
 */

// Bulletproof-ing.
// $ = jQuery. window = this. undefined = undefined.
(function ($, window, undefined) {
  'use strict';

  var SyncingParamsModel = Backbone.Model.extend({
    toParams: function () {
      if (typeof this.syncParams === 'undefined') {
        throw new TypeError('You must define syncParams or over-ride the toParams method.');
      }

      var rawParams = _(this.toJSON()).pick(this.syncParams);
      return this.removeEmptyParams(rawParams);
    },

    removeEmptyParams: function (rawParams) {
      return Helpers.removeEmptyAttributes(rawParams);
    },

    sync: function (method, model, options) {
      switch (method) {
      case 'update':
      case 'delete':
        options.url   = [this.url(), this.get('id')].join('/');
        options.attrs = this.toParams();
        break;
      case 'create':
        options.attrs = this.toParams();
        break;
      case 'read':
        options.data  = this.toParams();
      }

      return Backbone.sync.call(model, method, model, options);
    }
  });

  window.SyncingParamsModel = SyncingParamsModel || {};

}(jQuery, this));
