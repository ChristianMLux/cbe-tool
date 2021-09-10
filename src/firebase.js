import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();

export default { firebaseApp, database };
