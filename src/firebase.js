// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoiI4odj3ZmNkuJ98PNzixM3KljspxvaE",
  authDomain: "admin-d8848.firebaseapp.com",
  projectId: "admin-d8848",
  storageBucket: "admin-d8848.appspot.com",
  messagingSenderId: "347069350336",
  appId: "1:347069350336:web:13ae2526adbc3174cdc825",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Ensure auth is correctly initialized and exported
const db = getFirestore(app);

export { auth, app, db }; // Export auth and app if needed elsewhere
