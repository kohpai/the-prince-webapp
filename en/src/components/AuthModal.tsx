import React, { FunctionComponent, useState } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Modal } from "antd";

import firebase from "../lib/firebase";
import { State, Action } from "../lib/authModalStore";

const AuthModal: FunctionComponent = () => {
  const visibility = useSelector((state: State) => state.isVisible);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const dispatch = useDispatch<Dispatch<Action>>();

  firebase
    .auth()
    .onAuthStateChanged((signedInUser) =>
      signedInUser ? setUser(signedInUser) : setUser(null)
    );

  const closeModal = () => {
    dispatch({ type: "AUTHMODAL_CLOSE" });
  };

  return (
    <>
      { user && redirecting && <Redirect to="/user" />}
      <Modal
        className="undo-info"
        title="Sign up / sign in"
        visible={visibility}
        onOk={closeModal}
        onCancel={closeModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        {/* <Title level={3}>Thank you for your interest!</Title>
        <Paragraph>
          <span className="avoidwrap">
            We're working our ass off to launch this service.&nbsp;
          </span>
          <span className="avoidwrap">
            Sign up now, and we'll email you as soon as our service is ready!
          </span>
        </Paragraph> */}
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: "popup",
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.GithubAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
              signInSuccessWithAuthResult: () => {
                closeModal();
                setRedirecting(true);
                return false;
              },
            },
          }}
          firebaseAuth={firebase.auth()}
        />
        {/* <Paragraph>
          <em>
            Note: while you're here, you can play around with the website and
            send us feedback via <ContactIcons />.
          </em>
        </Paragraph> */}
      </Modal>
    </>
  );
};

export default AuthModal;
