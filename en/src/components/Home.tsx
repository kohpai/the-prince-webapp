import React from "react";
import { Col, Divider, Image, Row, Space, Table, Typography } from "antd";

import checkedImg from "../assets/checked.png";
import minusImg from "../assets/minus.png";
import { HealthStats } from "./commonTypes";
import { Loading } from "./Loading";

interface ServiceStatusProps {
  healthStats?: HealthStats;
}

interface HomeProps {
  loading: boolean;
  healthStats?: HealthStats;
}

interface HealthStatsRecord {
  key: string;
  feature: string;
  status: boolean;
  checkedAt: Date;
}

const { Title, Paragraph } = Typography;

const columns = [
  {
    title: "Service Feature",
    dataIndex: "feature",
    key: "feature",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) =>
      status ? <Image src={checkedImg} /> : <Image src={minusImg} />,
  },
  {
    title: "Last check",
    dataIndex: "checkedAt",
    key: "checkedAt",
    render: (date: Date) => date.toLocaleString(),
  },
];

const UserActionFlow = () => (
  <ol className="info">
    <li>
      Sign up or sign in to top up your wallet (minimum amount of 5 €, you can
      save it for later{" "}
      <span role="img" aria-label="smiley-face">
        😊
      </span>
      )
    </li>
    <li>
      Upload and print your document (you can set color mode and page range as
      well)
    </li>
    <li>
      Get your documents at <b>Vogeliusweg 12/12.1.3, 33100 Paderborn</b>. See
      the map below. Please try not to come after 23.00 and before 6.30 (unless
      you really need that document!), you can still print the documents and get
      it later though.
    </li>
  </ol>
);

const ServiceStatus = ({ healthStats }: ServiceStatusProps) => {
  const now = new Date();
  const server: HealthStatsRecord = {
    key: "1",
    feature: "Printing server is online",
    status: false,
    checkedAt: now,
  };
  const printer: HealthStatsRecord = {
    key: "2",
    feature: "Printer is connected",
    status: false,
    checkedAt: now,
  };
  const welcome: HealthStatsRecord = {
    key: "3",
    feature: "Is now a good time to pick up my documents?",
    status: false,
    checkedAt: now,
  };

  if (healthStats) {
    server.status = true;
    printer.status = healthStats.printerConnected;
    welcome.status = healthStats.welcome;
  }

  return (
    <Table
      columns={columns}
      dataSource={[server, printer, welcome]}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export const Home = ({ healthStats, loading }: HomeProps) => {
  return (
    <>
      <Space className="expand-space" direction="vertical" size="large">
        <Row>
          <Col span={24}>
            <Title level={3}>
              <span className="avoidwrap">Print your documents,&nbsp;</span>
              <span className="avoidwrap">
                available for 24 hours<sup className="origin">1</sup>!
              </span>
            </Title>
            <UserActionFlow />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Paragraph className="info">
              <sup>1</sup>Please see the service realtime status here.
            </Paragraph>
            <ServiceStatus healthStats={healthStats} />
          </Col>
        </Row>
        <Row>
          <Col className="info" span={24}>
            <Divider orientation="left">
              <Title level={4}>Pick it up here!</Title>
            </Divider>
            <iframe
              className="map-iframe"
              width="100%"
              height="450"
              title="gmaps"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCdAgrKsZH0EVltMS1uOE6sJxIZzB4H1X8&q=The+Prince:+24-Stunden+Druckservice"
              allowFullScreen={true}
            />
          </Col>
        </Row>
      </Space>
      <Loading
        title="Checking service"
        loading={loading}
        text="Please wait while we're checking the service's status."
      />
    </>
  );
};
