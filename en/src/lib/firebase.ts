import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/remote-config";

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

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.fetchTimeoutMillis = 10000;
remoteConfig.defaultConfig = {
  black_cpp: "0.50",
  color_cpp: "0.80",
  discount_percentage: "25",
};

export default firebase;
export { firebase, remoteConfig };
