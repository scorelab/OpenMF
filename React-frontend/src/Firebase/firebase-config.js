import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmp9eDCqsYmAX-Nfm6JUUCg0Gdf_Os_FQ",
  authDomain: "openmf-2f8b5.firebaseapp.com",
  projectId: "openmf-2f8b5",
  storageBucket: "openmf-2f8b5.appspot.com",
  messagingSenderId: "409730839482",
  appId: "1:409730839482:web:31d8d7b8da15530fb9e383",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
