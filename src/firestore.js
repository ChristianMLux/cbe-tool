import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseFirestore = initializeApp({
  apiKey: "AIzaSyDK60vOqpkFWkt0PtLX0GYX3vwYFgjKfRg",
  authDomain: "coding-bootcamps-eu.firebaseapp.com",
  projectId: "coding-bootcamps-eu",
});
// datentabelle auslesen, über ergebnis iterieren, map -> neues doc (key umbennennen, values gleich, speichern)
const firestoreDB = getFirestore(firebaseFirestore);

export default firestoreDB;
