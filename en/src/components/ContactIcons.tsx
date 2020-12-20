import React from "react";
import { Space } from "antd";
import {
  FacebookFilled,
  GoogleCircleFilled,
  WhatsAppOutlined,
  MessageFilled,
} from "@ant-design/icons";

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
      href="https://m.me/115488230299288"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageFilled />
    </a>
    <a
      className="icon-contact-size"
      href="https://goo.gl/maps/1mkUKmvyn7JZHDJ68"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GoogleCircleFilled />
    </a>
    <a
      className="icon-contact-size"
      href="https://wa.me/message/OUFOSTYCAFZGK1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppOutlined />
    </a>
    <a
      href="tel:+4917635517262"
      target="_blank"
      rel="noopener noreferrer"
    >
      +4917635517262
    </a>
  </Space>
);
