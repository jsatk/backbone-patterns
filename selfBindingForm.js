/*
 * Simple binding forms who's fields map exactly to backing model properties.
 * Given: `this.model` has property `firstName`
 * Changes to `<input name='firstName'>` will issue `this.model.set('firstName')`.
 */

// Bulletproof-ing.
// $ = jQuery. window = this. undefined = undefined.
(function ($, window, undefined) {
  'use strict';

  var SelfBindingForm = Backbone.View.extend({
    events: {
      'change select'       : 'captureFieldChange',
      'change input'        : 'captureFieldChange',
      'submit'              : 'submit',
      'click [name=cancel]' : 'cancel'
    },

    captureFieldChange: function (event) {
      var property = event.target.name,
          val      = $(event.target).val();

      if (property) {
        this.model.set(property, val);
      }
    },

    submit: function (event) {
      // no-op hook so implementers can over-ride when desired
      return true;
    },

    cancel: function (event) {
      // no-op hook so implementers can over-ride when desired
      return true;
    },

    render: function () {
      this.$el.html(
        this.template(
          this.model.toJSON()
        )
      );

      return this;
    }
  });

  window.SelfBindingForm = SelfBindingForm || {};

}(jQuery, this));
