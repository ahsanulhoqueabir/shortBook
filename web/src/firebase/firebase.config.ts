// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY_apiKey,
  authDomain: import.meta.env.VITE_APIKEY_authDomain,
  projectId: import.meta.env.VITE_APIKEY_projectId,
  storageBucket: import.meta.env.VITE_APIKEY_storageBucket,
  messagingSenderId: import.meta.env.VITE_APIKEY_messagingSenderId,
  appId: import.meta.env.VITE_APIKEY_appId,
  measurementId: import.meta.env.VITE_APIKEY_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { app, analytics, db };
