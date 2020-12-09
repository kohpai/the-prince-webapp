import React, { FunctionComponent } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Modal } from "antd";

import firebase from "../lib/firebase";

interface Props {
  isVisible: boolean
  onAuthenticate(): void
  onClose(): void
}

const AuthModal: FunctionComponent<Props> = ({isVisible, onAuthenticate, onClose}) => {

  return (
    <Modal
      className="undo-info"
      title="Sign up / sign in"
      visible={isVisible}
      onOk={onClose}
      onCancel={onClose}
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
              onAuthenticate();
              onClose();
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
  )
}

export default AuthModal