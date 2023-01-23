import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS0Ft9Yx3PudSVte6rqbh2eqWT8eY9P9g",
  authDomain: "find-apartment-79d12.firebaseapp.com",
  databaseURL:
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "find-apartment-79d12",
  storageBucket: "find-apartment-79d12.appspot.com",
  messagingSenderId: "877814320593",
  appId: "1:877814320593:web:3f4158798b7ba123a6a4f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export default firebaseConfig;
