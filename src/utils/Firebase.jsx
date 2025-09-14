// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHrlJAutXTAfmzjOFH8lcYWucgJ06IJpI",
  authDomain: "netflixgpt-e52e1.firebaseapp.com",
  projectId: "netflixgpt-e52e1",
  storageBucket: "netflixgpt-e52e1.firebasestorage.app",
  messagingSenderId: "818544641720",
  appId: "1:818544641720:web:444c76782ccf6bc8d6164d",
  measurementId: "G-L0GHBRW3JK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
import { getAuth } from "firebase/auth";

export const auth = getAuth();
