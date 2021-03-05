import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxyIa6S-U6m-yM84HhI0J_FQfCgyvaGGg",
  authDomain: "ddi2020b.firebaseapp.com",
  projectId: "ddi2020b",
  storageBucket: "ddi2020b.appspot.com",
  messagingSenderId: "97721431269",
  appId: "1:97721431269:web:7dcea2d5e445069205d00c",
  measurementId: "G-784T0C0FLS",
};
const app = firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const auth = app.auth();
