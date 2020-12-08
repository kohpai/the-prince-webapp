import React from "react";
import { Divider, Space, Typography } from "antd";
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";
import LeftRightMargin from "./LeftRightMargin";

const { Title, Paragraph } = Typography;

export const About = () => (
  <LeftRightMargin>
    <Space direction="vertical" size="small">
      <Title level={3}>What's this?</Title>
      <Paragraph className="info">
        One thing I noticed when I moved to Germany is that finding an
        in-service print shop in the early morning is very difficult, let alone
        ones operating at night. So I decided to buy my first printer and turned
        it into this dusk-till-dawn online printing service so that
        procrastinators like me can rest assure at night that the documents will
        be ready before dawn.
      </Paragraph>

      <Divider orientation="center">
        <Title level={3}>How does this work?</Title>
      </Divider>

      <Paragraph className="info">
        Roughly speaking, I wrote a little program on my laptop which is
        connected to the printer in my apartment; the program will be waiting
        for any print jobs from this website. I'll leave my laptop powered on at
        night so any print jobs will be executed automatically as long as this
        setup remains. Consequently, when I go to school in the morning, the
        service won't be available.
      </Paragraph>

      <Paragraph className="info">
        To save every penny (or euro, to be relatable), I host every part of the
        service on local machines and free cloud services. I could use a
        raspberry pi instead of my laptop to make the service a true 24/7. But
        at the end of the day, I'm still a student{" "}
        <span role="img" aria-label="grinning-face">
          😅
        </span>
        . I might opensource this one day, after I make sure no sensitive data
        are exposed in my code.
      </Paragraph>

      <Divider orientation="center">
        <Title level={3}>About me</Title>
      </Divider>

      <Paragraph className="info">
        I have a lot of digital footprints online; here are some that I'm happy
        to share:
        <ul>
          <li>
            <a
              href="https://github.com/kohpai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubFilled /> GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/srikote-naewchampa-50109b9b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinFilled /> LinkedIn
            </a>
          </li>
        </ul>
      </Paragraph>
    </Space>
  </LeftRightMargin>
);
