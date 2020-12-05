importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js'); // eslint-disable-line
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js'); // eslint-disable-line
/*
firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  messagingSenderId: "236099266052",
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});*/
