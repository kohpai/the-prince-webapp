import React, { useEffect, useState } from "react";
import { Col, Divider, Image, Row, Space, Table, Tabs, Typography } from "antd";

import checkedImg from "../assets/checked.png";
import minusImg from "../assets/minus.png";
import { HealthStats } from "./commonTypes";
import { Loading } from "./Loading";
import { remoteConfig } from "../lib/firebase";
import LeftRightMargin from "./LeftRightMargin";

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

interface PriceRecord {
  key: string;
  numPages: string;
  blackCpp: string;
  colorCpp: string;
}

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const availabilityColumns = [
  {
    title: "Service Feature",
    dataIndex: "feature",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: boolean) =>
      status ? <Image src={checkedImg} /> : <Image src={minusImg} />,
  },
  {
    title: "Last check",
    dataIndex: "checkedAt",
    render: (date: Date) => date.toLocaleTimeString(),
  },
];

const priceColumns = [
  {
    title: "Number of pages",
    dataIndex: "numPages",
  },
  {
    title: "Black & White (EUR per page)",
    dataIndex: "blackCpp",
    render: (cpp: string, _: any, index: number) =>
      index === 1
        ? {
            children: cpp,
            props: {
              colSpan: 2,
            },
          }
        : cpp,
    align: "center" as const,
  },
  {
    title: "Color (EUR per page)",
    dataIndex: "colorCpp",
    render: (cpp: string, _: any, index: number) =>
      index === 1
        ? {
            children: cpp,
            props: {
              colSpan: 0,
            },
          }
        : cpp,
    align: "center" as const,
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
      columns={availabilityColumns}
      dataSource={[server, printer, welcome]}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

const PriceTable = () => {
  const [price, setPrice] = useState({
    blackCpp: "0.00",
    colorCpp: "0.00",
    discount: "0",
  });

  useEffect(() => {
    const main = async () => {
      await remoteConfig.fetchAndActivate();
      setPrice({
        blackCpp: remoteConfig.getString("black_cpp"),
        colorCpp: remoteConfig.getString("color_cpp"),
        discount: remoteConfig.getString("discount_percentage"),
      });
    };
    main();
  }, []);

  const data: PriceRecord[] = [
    {
      key: "1",
      numPages: "1-9 pages",
      blackCpp: price.blackCpp,
      colorCpp: price.colorCpp,
    },
    {
      key: "2",
      numPages: "10 or more pages",
      blackCpp: `${price.discount}% discount from total price`,
      colorCpp: "",
    },
  ];

  return (
    <Table
      columns={priceColumns}
      dataSource={data}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export const Home = ({ healthStats, loading }: HomeProps) => {
  return (
    <LeftRightMargin>
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
              <sup>1</sup>Please see the service realtime status and price here.
            </Paragraph>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Availability" key="1">
                <ServiceStatus healthStats={healthStats} />
              </TabPane>
              <TabPane tab="Price" key="2">
                <PriceTable />
              </TabPane>
            </Tabs>
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
    </LeftRightMargin>
  );
};
