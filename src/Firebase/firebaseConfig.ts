// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6l-Nq-vBh3yDUX_F0Nls25ehUpNh_V00",
  authDomain: "utilize-assignment-1ec5c.firebaseapp.com",
  projectId: "utilize-assignment-1ec5c",
  storageBucket: "utilize-assignment-1ec5c.appspot.com",
  messagingSenderId: "1032872722240",
  appId: "1:1032872722240:web:6fef1f5b207f02a17704a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
