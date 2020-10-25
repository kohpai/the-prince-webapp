import React, { useEffect, useState } from "react";
import { Col, Divider, Image, Row, Space, Table, Tabs, Typography } from "antd";

import checkedImg from "../assets/checked.png";
import minusImg from "../assets/minus.png";
import { HealthStats } from "./commonTypes";
import { Loading } from "./Loading";
import { remoteConfig } from "../lib/firebase";

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
    dataIndex: "feature"
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: boolean) =>
      status ? <Image src={checkedImg} /> : <Image src={minusImg} />
  },
  {
    title: "Zuletzt überprüft",
    dataIndex: "checkedAt",
    render: (date: Date) => date.toLocaleString()
  }
];

const priceColumns = [
  {
    title: "Seitenzahl",
    dataIndex: "numPages"
  },
  {
    title: "Schwarz & Weiß (EUR pro Seite)",
    dataIndex: "blackCpp",
    render: (cpp: string, _: any, index: number) =>
      index === 1
        ? {
          children: cpp,
          props: {
            colSpan: 2
          }
        }
        : cpp,
    align: "center" as const
  },
  {
    title: "Farbe (EUR pro Seite)",
    dataIndex: "colorCpp",
    render: (cpp: string, _: any, index: number) =>
      index === 1
        ? {
          children: cpp,
          props: {
            colSpan: 0
          }
        }
        : cpp,
    align: "center" as const
  }
];

const UserActionFlow = () => (
  <ol className="info">
    <li>
      Melde dich an oder registriere dich um dein Guthaben aufzuladen
      (Mindestbetrag: 5 €, du kannst dir den Rest für später aufheben{" "}
      <span role="img" aria-label="smiley-face">
        😊
      </span>
      )
    </li>
    <li>
      Lade dein Dokument hoch und drucke es aus (du kannst den Farbmodus und die
      Seiten auswählen)
    </li>
    <li>
      Hol deine Dokumente am <b>Vogeliusweg 12/12.1.3, 33100 Paderborn ab</b>.
      Siehe Karte unten. (Bitte probiere nicht nach 23 Uhr und nicht vor 6:30
      Uhr zu kommen. Du kannst die Dokumente natürlich schon ausdrucken, aber
      dann später abholen.)
    </li>
  </ol>
);

const ServiceStatus = ({ healthStats }: ServiceStatusProps) => {
  const now = new Date();
  const server: HealthStatsRecord = {
    key: "1",
    feature: "Druckserver ist online",
    status: false,
    checkedAt: now
  };
  const printer: HealthStatsRecord = {
    key: "2",
    feature: "Drucker ist verbunden",
    status: false,
    checkedAt: now
  };
  const welcome: HealthStatsRecord = {
    key: "3",
    feature: "Kann ich die Dokumente jetzt abholen?",
    status: false,
    checkedAt: now
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
      numPages: "1-9 Seiten",
      blackCpp: price.blackCpp,
      colorCpp: price.colorCpp,
    },
    {
      key: "2",
      numPages: "10 oder mehr Seiten",
      blackCpp: `${price.discount}% Rabatt auf den Gesamtpreis`,
      colorCpp: ""
    }
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
    <>
      <Space className="expand-space" direction="vertical" size="large">
        <Row>
          <Col span={24}>
            <Title level={3}>
              <span className="avoidwrap">
                Drucke deine Dokumente aus,&nbsp;
              </span>
              <span className="avoidwrap">
                24 Stunden verfügbar<sup className="origin">1</sup>!
              </span>
            </Title>
            <UserActionFlow />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Paragraph className="info">
              <sup>1</sup>Den Echtzeitstatus des Dienstes findest du hier.
            </Paragraph>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Verfügbarkeit" key="1">
                <ServiceStatus healthStats={healthStats} />
              </TabPane>
              <TabPane tab="Preis" key="2">
                <PriceTable />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col className="info" span={24}>
            <Divider orientation="left">
              <Title level={4}>Hole es hier ab</Title>
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
        title="Service wird überprüft"
        loading={loading}
        text="Einen Moment Geduld, während wir den Service Status überprüfen"
      />
    </>
  );
};
