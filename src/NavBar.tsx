import React, { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface NavProps {
  page: string;
}

const validPages = ["home", "about"];

export const NavBar = ({ page }: NavProps) => {
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
        <Menu
          mode="vertical"
          theme="dark"
          defaultSelectedKeys={[validPages.includes(page) ? page : "home"]}
        >
          <Menu.Item key="home">
            <Link to="/home">Get started guide</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">What's this?</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};
