import React, { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [drawerVisibility, setVisibility] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisibility(true);
        }}
        icon={<MenuUnfoldOutlined />}
      >
        Menu
      </Button>
      <Drawer
        title="The Prince"
        placement="left"
        closable={true}
        onClose={() => {
          setVisibility(false);
        }}
        visible={drawerVisibility}
      >
        <Menu mode="vertical" theme="dark">
          <Menu.Item key="1">
            <Link to="/">Get started guide</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">What's this?</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};
