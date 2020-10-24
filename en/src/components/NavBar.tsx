import React, { useState } from "react";
import { Button, Drawer, Menu, Space } from "antd";
import {
  BookOutlined,
  MenuUnfoldOutlined,
  PrinterOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import firebase from "../lib/firebase";
import { ContactIcons } from "./ContactIcons";

interface NavProps {
  page: string;
}

const validPages = ["home", "about", "user"];

export const NavBar = ({ page }: NavProps) => {
  const [drawerVisibility, setVisibility] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  const openDrawer = () => {
    setVisibility(true);
  };

  const closeDrawer = () => {
    setVisibility(false);
  };

  firebase
    .auth()
    .onAuthStateChanged((signedInUser) =>
      signedInUser ? setUser(signedInUser) : setUser(null)
    );

  return (
    <>
      <Space direction="horizontal">
        <Button
          type="primary"
          onClick={openDrawer}
          icon={<MenuUnfoldOutlined />}
        >
          Menu
        </Button>
        <ContactIcons />
      </Space>
      <Drawer
        title="The Prince"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        visible={drawerVisibility}
      >
        <Menu
          mode="vertical"
          theme="dark"
          onClick={closeDrawer}
          defaultSelectedKeys={[validPages.includes(page) ? page : ""]}
        >
          <Menu.Item key="home">
            <Link to="/home">
              <BookOutlined /> Get started guide
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">
              <QuestionCircleOutlined /> What's this?
            </Link>
          </Menu.Item>
          {user && (
            <Menu.Item key="user">
              <Link to="/user">
                <PrinterOutlined /> Print console
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
    </>
  );
};
