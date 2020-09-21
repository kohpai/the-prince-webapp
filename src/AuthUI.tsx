import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Modal, Button, Dropdown, Menu } from "antd";
import {
  LogoutOutlined,
  PrinterOutlined,
  UserOutlined,
} from "@ant-design/icons";

import firebase from "./firebase";
import { Link, Redirect } from "react-router-dom";

export const AuthUI = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const openModal = () => {
    setModalVisibility(true);
  };
  const closeModal = () => {
    setModalVisibility(false);
  };

  firebase
    .auth()
    .onAuthStateChanged((signedInUser) =>
      signedInUser ? setUser(signedInUser) : setUser(null)
    );

  return user ? (
    <>
      {redirecting && <Redirect to="/user" />}
      <Dropdown
        placement="bottomRight"
        trigger={["hover", "click"]}
        overlay={
          <Menu>
            <Menu.Item>
              <Link to="/user">
                <PrinterOutlined /> Print console
              </Link>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                firebase.auth().signOut();
                setRedirecting(true);
              }}
            >
              <LogoutOutlined /> Sign out
            </Menu.Item>
          </Menu>
        }
      >
        <Button type="primary">
          <UserOutlined /> {user.displayName}
        </Button>
      </Dropdown>
    </>
  ) : (
    <>
      {redirecting && <Redirect to="/home" />}
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
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
              firebase.auth.GithubAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
              signInSuccessWithAuthResult: () => {
                setRedirecting(true);
                setModalVisibility(false);
                return false;
              },
            },
          }}
          firebaseAuth={firebase.auth()}
        />
      </Modal>
    </>
  );
};
