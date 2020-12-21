import React, { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import { Button, Dropdown, Menu } from "antd";
import {
  LogoutOutlined,
  PrinterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";

import firebase from "../lib/firebase";
import { Action } from "../lib/authModalStore";

export const AuthUI = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const dispatch = useDispatch<Dispatch<Action>>();

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
        trigger={["click"]}
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
      <Button
        type="primary"
        onClick={() => {
          dispatch({ type: "AUTHMODAL_OPEN" });
        }}
      >
        <UserOutlined /> Sign up / sign in
      </Button>
    </>
  );
};
