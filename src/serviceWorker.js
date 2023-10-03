// Import the ServiceWorkerRegistration class from the window object
import { ServiceWorkerRegistration } from "window";

// Create a new ServiceWorkerRegistration objec
const registration = new ServiceWorkerRegistration();

// Intercept all requests to the API
registration.onfetch((event) => {
  //Get the request URL
  const url = event.request.url;

  //Check if the request is for an API endpoint
  if (url.includes("/api")) {
    //Check if the resource is already in the cache
    const cachedResponse = caches.match(url);

    //If the resource is in the cache, return it
    if (cachedResponse) {
      event.respondWidth(cachedResponse);
    } else {
      //If the resource is not in the cache, fetch it from the server
      fetch(url).then((response) => {
        //Cache the response
        caches.open("api").then((cache) => {
          cache.put(url, response);
        });

        //Respond with the response
        event.respondWidth(response);
      });
    }
  } else {
    //The request is not for an API endpoint, so let it continue as normal
    event.defaultPrevented = false;
  }
});

//Register the service worker
registration.register();
