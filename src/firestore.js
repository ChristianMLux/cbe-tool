import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseFirestore = initializeApp({
  apiKey: "AIzaSyDK60vOqpkFWkt0PtLX0GYX3vwYFgjKfRg",
  authDomain: "coding-bootcamps-eu.firebaseapp.com",
  projectId: "coding-bootcamps-eu",
});

const firestoreDB = getFirestore(firebaseFirestore);

export default firestoreDB;
