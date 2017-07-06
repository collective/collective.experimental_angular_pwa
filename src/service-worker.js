/**
 * Check out https://googlechrome.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');
importScripts('./assets/js/localforage.js')

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.cacheFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

console.log("Service worker is working");

//for flushing queue when onLine  
self.toolbox.router.post(/flush$/, () => {
  return flushQueue();
})

self.toolbox.router.post(/@comments$/, (req, res) => {
  console.log(req, res);
  let fakeResponse = new Response(null, {
    status: 202
  })
  
  if(!navigator.onLine) {
    console.log("No network availability, enqueing");
    return enqueue(req).then(function() {
      return fakeResponse.clone();
    })
  }

  console.log("Network available! Flushing the queue");
  return flushQueue().then(function() {
    return fetch(req);
  })
  
}, {origin: 'http://plonepwa.herokuapp.com/Plone'});

function enqueue(request) {
  return serialize(request).then(function(serialized) {
    localforage.getItem('queue').then(function(queue) {
      queue = queue || [];
      queue.push(serialized);

      return localforage.setItem('queue', queue).then(function() {
        console.log(serialized.method, serialized.url, 'enqueued!');
      });
    });
  });
}

function flushQueue() {
  return localforage.getItem('queue').then(function(queue) {
    queue = queue || [];
    if(!queue.length) {
      return Promise.resolve();
    }

    console.log('Sending', queue.length, 'requests...');
    return sendInOrder(queue).then(function() {
      return localforage.setItem('queue', []);
    })
  })
}

function sendInOrder(requests) {
  var sending = requests.reduce(function(prevPromise, serialized) {
    console.log("Sending", serialized.method, serialized.url);
    return prevPromise.then(function() {
      return deserialize(serialized).then(function(request) {
        return fetch(request);
      });
    });
  }, Promise.resolve());
  return sending;
}

function serialize(request) {
  var headers = {};

  for(var entry of request.headers.entries()) {
    headers[entry[0]] = entry[1];
  }

  var serialized = {
    url: request.url,
    headers: headers,
    method: request.method,
    mode: request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer
  };

  if(request.method !== 'GET' && request.method !== 'HEAD') {
    return request.clone().text().then(function(body) {
      serialized.body = body;
      return Promise.resolve(serialized);
    });
  }
  return Promise.resolve(serialized);
}

function deserialize(data) {
  return Promise.resolve(new Request(data.url, data));
}