import React from "react";
import { Space } from "antd";
import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";

export const ContactIcons = () => (
  <Space direction="horizontal">
    <a
      className="icon-contact-size"
      href="https://www.facebook.com/The-Prince-almost-24-hour-printing-service-115488230299288/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FacebookFilled />
    </a>
    <a
      className="icon-contact-size"
      href="https://github.com/kohpai"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GoogleCircleFilled />
    </a>
  </Space>
);
