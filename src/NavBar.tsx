import React, { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";

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
          <Menu.Item key="1">Get started guide</Menu.Item>
          <Menu.Item key="2">What's this?</Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};
