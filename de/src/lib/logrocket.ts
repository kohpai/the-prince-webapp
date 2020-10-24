import LogRocket from "logrocket";

import config from "../config";
import firebase from "./firebase";

if (process.env.NODE_ENV === "production") {
  LogRocket.init(config.logrocket.APP_ID);
}

firebase.auth().onAuthStateChanged((signedInUser) => {
  if (signedInUser && process.env.NODE_ENV === "production") {
    LogRocket.identify(signedInUser.uid, {
      name: signedInUser.displayName as string,
      email: signedInUser.email as string,
    });
  }
});
