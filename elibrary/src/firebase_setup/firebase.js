// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_moNU5wfJiEJlvSt-qMzqLdl9kwu3d_k",
  authDomain: "e-library-36942.firebaseapp.com",
  projectId: "e-library-36942",
  storageBucket: "e-library-36942.appspot.com",
  messagingSenderId: "608460856196",
  appId: "1:608460856196:web:aeff88faa9eb5e73ca9bd1",
  measurementId: "G-EZ8Y3PBYX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
