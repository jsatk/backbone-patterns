backbone-patterns
=================

Commonly used patterns in Backbone.js. Meant to simplify the boilerplate code one has to write and solve common problems with Backbone.

`SyncingParamsModel`
--------------------

`SyncingParamsModel` implements (painfully) common pattern where a models params should be filtered down to a smaller list before sumitting. Often a backbone model will be used to maintain the state of a view as well as a list of attributes that need to be synced to a server-side model. A backbone model's attributes lining up perfectly with a server-side model is a rare occurance. There are two choices—either set two model's on a view. The first option I see is one model controlling the state of the view and the second maintaining the attributes that will be synced to the server-side model. The second option, which is more appealing to me and which is what this model attempts to solve, maintains an array of white-listed attributes to sync to the server in a property called `syncParams`. To use simply extend `SyncingParamsModel` and define an array on the model called `syncParams` of all the attributes you want to sync to the server.

`SelfBindingForm`
-----------------

`SelfBindingForm` is a simple binding forms who's fields map exactly to backing model properties. For example if this view's model has property `firstName` then changes to `<input name='firstName'>` will issue `this.model.set('firstName')`. This is a convenient way to get around some of the boilerplate required in building out a form view since Backbone doesn't have two-way databinding. To use simply extend `SelfBindingForm` and define `submit` and `cancel` methods on it. Then ensure that the underscore template you set on the view has a form with input names that you wish set on the model on change of field.
