Offline
=======

    One of the most defining features of a PWA is that it needs to work offline as well. This is acheived using service workers.
    
To implement the offline functionality in plone PWA we are using an offline service and using service workers.    
    
Offline Service
---------------

The offline service manages a ton of things
* Handling the offline toast msg
* Handling the download offline feature in the setting menu
* Offline comments with the use of Ionic 2 events
* Flushing the queue of network requests when the app comes back online.

Service Workers
---------------

The service worker is using two external scripts to make caching and storing requests in localstorage easier. We are using:

* `SW-Toolbox <https://googlechrome.github.io/sw-toolbox/>`_  a collection of service worker tools for offlining runtime requests.
* `LocalForage <https://github.com/localForage/localForage>`_ a fast and simple storage library for JavaScript. localForage improves the offline experience of your web app by using asynchronous storage (IndexedDB or WebSQL) with a simple, localStorage-like API. This is needed since localstorage dosen't work with service workers.

The service workers are managing three important things in the PWA

1. Caching: SW-Toolbox helps us with this. It dynamically caches all local assets. We also use pre-cache all our key assets, this includes the html, css, js files which make the shell of the app and wont change with time. There are a lot of inbuilt network strategies. We are using the networkFirst strategy, all requests for resources are first sent out to the network, if the app is offline we use the cached resources.

2. Handling Offline Comments: All post requests ending with /@comments are intercepted by the service worker, a fake response with status 202 is sent back. If the app is offline the request in enqueued, if not the request goes out to the network.  

3. Handling Offline Editing: Since SW-Toolbox does not provide support for patch requests, we use the native javascript code for service workers by listening for the fetch event, if the request method is PATCH and device is offline a fake request with status 204 is sent back. If the device is offline the request is enqueued, and the request payload of the PATCH request is used to replace the response for the URL already saved in the cache by making some changes so that on saving the document while offline the changes persist.

Understanding the Enqueue and Flush Operation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
* Enqueue Operation - First the network request is serialised, we then get the queue stored in storage using localforage, push the request into the queue and save it back.
* Flush Operation - We get the queue from storage, each item from the queue is first deserialized then sent to the network, we wait for the promise for one and only then send the next, so they are sent in order.













    
    
