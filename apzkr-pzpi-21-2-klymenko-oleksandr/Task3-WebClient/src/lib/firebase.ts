import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseOptions: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "testproject-d6a6a.firebaseapp.com",
  projectId: "testproject-d6a6a",
  storageBucket: "testproject-d6a6a.appspot.com",
  messagingSenderId: "851756300269",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseOptions);

export const auth = getAuth(app);
