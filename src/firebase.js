const firebase = require("firebase/app");
require("firebase/database");
require("firebase/auth");

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY_CBE || "secrets.DBKEY",
  authDomain: "coding-bootcamps-eu.firebaseapp.com",
  databaseURL:
    "https://coding-bootcamps-eu-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "coding-bootcamps-eu",
  storageBucket: "coding-bootcamps-eu.appspot.com",
  messagingSenderId: "230771669778",
  appId: "1:230771669778:web:b27562762dac4c765a51cb",
};

// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);

let db = firebase.default.database();

export default db;
