Editing
=======

    Two packages being used for implementing the editing feature are Angular 2 Schema Form 
    and Angular Medium Editor. 

The four important things related to editing are

* Edit View
* Custom Widgets and Registry
* Medium Editor and Customisation
* Handling Offline editing

Edit View
---------

Traversing to /@@edit on any plone view, leads us to the edit view. An edit form is instantiated by the Schema form package which gets the schema as input from plone restapi and displays the form with the appropriate widgets according to input type. 

Custom Widgets and Registry
---------------------------

A new custom registry - Ionic Registry has been made which extends the default widget registry.
It contains custom widgets for string, textarea, checkbox and date-time. 
It also contains a slightly customized version of the medium editor.
More information on creating custom widgets, registry and schema can be found here `Angular2 Schema Form <https://github.com/makinacorpus/angular2-schema-form>`_.

Medium Editor
-------------

Since TinyMCE editor was not suitable for use in mobile devices, we are using the `Angular2 Medium Editor <https://github.com/kitconcept/angular-medium-editor>`_
package which allows us to edit richtext items, with functionality similar to the medium editor allowing inline editing.

Handling Offline Editing
------------------------
The patch request sent out when saving the form details are intercepted by the service workers. If the app is online the request is sent out to the network in the normal way, but if the app is offline the request is saved in a queue to be sent out later when the app comes back online. 

The cache data corresponding to that resource is replaced by the request payload, hence the changes are visible even when offline.

More details regarding how the requests are enqueued and later dequeued and sent out to the network can be found in docs regarding the how the app works offline using service workers.

 
