import React from "react";
import { Divider, Space, Typography } from "antd";
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const About = () => (
  <Space direction="vertical" size="small">
    <Title level={3}>Was ist das?</Title>
    <Paragraph className="info">
      Etwas was ich gemerkt habe ist, dass es schwierig ist in Deutschland eine
      offene Druckerei früh morgens, geschweige denn spät abends, zu finden.
      Also habe ich entschlossen mir einen Drucker zu kaufen und diesen in einen
      fast 24 Stunden Druckshop zu verwandeln, damit Leute wie ich, welche erst
      im letzten Moment die benötigten Dokumente ausdrucken, mit dem Wissen,
      dass die Dokumente am nächsten Morgen rechtzeitig fertig sind.
    </Paragraph>

    <Divider orientation="center">
      <Title level={3}>How does this work?</Title>
    </Divider>

    <Paragraph className="info">
      Roughly speaking, I wrote a little program on my laptop which is connected
      to the printer in my apartment; the program will be waiting for any print
      jobs from this website. I'll leave my laptop powered on at night so any
      print jobs will be executed automatically as long as this setup remains.
      Consequently, when I go to school in the morning, the service won't be
      available.
    </Paragraph>

    <Paragraph className="info">
      To save every penny (or euro, to be relatable), I host every part of the
      service on local machines and free cloud services. I could use a raspberry
      pi instead of my laptop to make the service a true 24/7. But at the end of
      the day, I'm still a student{" "}
      <span role="img" aria-label="grinning-face">
        😅
      </span>
      . I might opensource this one day, after I make sure no sensitive data are
      exposed in my code.
    </Paragraph>

    <Divider orientation="center">
      <Title level={3}>About me</Title>
    </Divider>

    <Paragraph className="info">
      I have a lot of digital footprints online; here are some that I'm happy to
      share:
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
);
