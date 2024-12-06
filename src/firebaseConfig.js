import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsgMWlDm8cdFh84NnO_X0Ptyu-hbveH-M",
  authDomain: "knock-knock-414e8.firebaseapp.com",
  projectId: "knock-knock-414e8",
  storageBucket: "knock-knock-414e8.firebasestorage.app",
  messagingSenderId: "237523675660",
  appId: "1:237523675660:web:7764ccd3ddbcf2dc441c29",
  measurementId: "G-YM6ZV4F69D",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
