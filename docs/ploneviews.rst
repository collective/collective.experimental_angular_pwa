Plone Views
===========

View components for the various plone types for e.g collection, document, event etc are derived from the ViewView component.
Then these customized views need to be associated with a view name for a given context marker. e.g ::

    this.traverser.addView('view', 'Event', EventComponent);


