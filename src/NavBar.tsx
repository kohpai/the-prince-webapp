import React, { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import {
  BookOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

interface NavProps {
  page: string;
}

const validPages = ["home", "about"];

export const NavBar = ({ page }: NavProps) => {
  const [drawerVisibility, setVisibility] = useState(false);
  const openDrawer = () => {
    setVisibility(true);
  };

  const closeDrawer = () => {
    setVisibility(false);
  };
  return (
    <>
      <Button type="primary" onClick={openDrawer} icon={<MenuUnfoldOutlined />}>
        Menu
      </Button>
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
          defaultSelectedKeys={[validPages.includes(page) ? page : "home"]}
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
        </Menu>
      </Drawer>
    </>
  );
};
