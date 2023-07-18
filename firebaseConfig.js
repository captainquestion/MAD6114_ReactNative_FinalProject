import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzjN3uBFswryXsmcisl27la-gSYhdYuJ4",
    authDomain: "testproject-75e84.firebaseapp.com",
    projectId: "testproject-75e84",
    storageBucket: "testproject-75e84.appspot.com",
    messagingSenderId: "803197269208",
    appId: "1:803197269208:web:476865f152d495590253ad",
    measurementId: "G-D7X8LL2WNX"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
