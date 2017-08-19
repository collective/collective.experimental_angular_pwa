Comments
========

    Comments page for a content can be accessed through the action sheet modal which opens  after clicking the edit icon floating action button in the right bottom corner.

The comments page has been implemented as a modal rather than a seperate page. It uses three components which have extended from plone-restapi angular. Comments is the parent component having:

* Comment Component which takes care of the individual comments
* Comment-add Component which handles the form for addition of new comments.


Offline Comments
----------------

To handle offline comments we are using the offline service, the service workers intercept the post request and depending on the state of the app, if online the request goes out to the network but if offline a dummy response is sent back and the request is saved in a queue. As soon as the app comes back online the the queue is flushed hence the changes are synced with the server.

Offline comments are shown seperately in the DOM below the comments which are already present.  