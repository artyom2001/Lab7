// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let entryCounter = 0;

let headerImage = document.querySelector("header img");
let headerText = document.querySelector("header h1");

// Make sure you register your service worker here too

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // push initial state
  history.pushState({state: "home"}, '', ' ');
  
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        entryCounter++;
        newPost.setAttribute("count", entryCounter);

        newPost.onclick = function(){ 
          setState({
            state: "entry",
            count: this.getAttribute('count'),
          }, true);
        }

      });
    });
});

headerImage.onclick = function(){
  router.setState({state: "settings"}, true);
}

headerText.onclick = function(){
  router.setState({state: "home"}, true);
}

window.onpopstate = function(event) {
  router.setState(event.state, false);
};
