
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-iP8EOZiHXSB77Gzr9a_UQMV23urOAsY",
  authDomain: "traveldn-b44ce.firebaseapp.com",
  databaseURL: "https://traveldn-b44ce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "traveldn-b44ce",
  storageBucket: "traveldn-b44ce.appspot.com",
  messagingSenderId: "924778933508",
  appId: "1:924778933508:web:a7fe13e0674f92ae2d3451",
  measurementId: "G-F5X49ZBXWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(app);
export const FIREBASE_STORE = getFirestore(app);
