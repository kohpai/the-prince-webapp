import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Modal, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import firebase from "./firebase";

export const AuthUI = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const openModal = () => {
    setModalVisibility(true);
  };
  const closeModal = () => {
    setModalVisibility(false);
  };
  return (
    <>
      <Button type="primary" onClick={openModal}>
        <UserOutlined /> Sign up / sign in
      </Button>
      <Modal
        title="Sign up / sign in"
        visible={modalVisibility}
        onOk={closeModal}
        onCancel={closeModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: "popup",
            signInSuccessUrl: "/signedIn",
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.GithubAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
          }}
          firebaseAuth={firebase.auth()}
        />
      </Modal>
    </>
  );
};
