import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0qS5DIJRKG32n9K64Le_RrONiDM8WNic",
  authDomain: "the-prince-98130.firebaseapp.com",
  databaseURL: "https://the-prince-98130.firebaseio.com",
  projectId: "the-prince-98130",
  storageBucket: "the-prince-98130.appspot.com",
  messagingSenderId: "256854549648",
  appId: "1:256854549648:web:3acb0dec1d55e74f0ae415",
  measurementId: "G-6L2PE7J093",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;