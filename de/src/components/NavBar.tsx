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
        <a href="https://the-prince-de.web.app/">DE</a>
        <a href="https://the-prince-98130.web.app/">EN</a>
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
              <BookOutlined /> So geht's
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">
              <QuestionCircleOutlined /> Was ist das?
            </Link>
          </Menu.Item>
          {user && (
            <Menu.Item key="user">
              <Link to="/user">
                <PrinterOutlined /> Ausdruckkonsole
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
    </>
  );
};
