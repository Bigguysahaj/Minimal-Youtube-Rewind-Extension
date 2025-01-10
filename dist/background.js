// This is service worker, these will be non blocking and completely async.
// Service workers follow a lifecycle

/* 
 1. Installation (once after installed or updated)
 2. Startup (each time browser starts)
 3. Shutdown / idle (when not called in use for 30 seconds)
*/

// Not the best idea to have any global variables here, the data will be lost when the service worker is shutdown.
// You could use chrome.storage or indexedDB to store data.

chrome.runtime.onInstalled.addListener(() => {
  // This is best place to do some initial setup, or add user to db.
  console.log('YouTube Rewind Extension installed or updated!');
});
