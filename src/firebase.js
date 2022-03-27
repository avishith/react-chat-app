import firebase from "firebase";


var firebaseConfig= {
    apiKey: "AIzaSyBvASbQdAvFxE6OEINSH_u6WPx1NIa6QFo",
    authDomain: "chatapp-274a9.firebaseapp.com",
    projectId: "chatapp-274a9",
    storageBucket: "chatapp-274a9.appspot.com",
    messagingSenderId: "856193923739",
    appId: "1:856193923739:web:1764208a4c12d424f5643e"
  };

firebase.initializeApp(firebaseConfig);

export {firebase}
