import React from "react";
import { Typography, Table, Row, Col, Space, Divider, Image } from "antd";

import { Loading } from "./Loading";
import { HealthStats } from "./commonTypes";
import minusImg from "../assets/minus.png";
import checkedImg from "../assets/checked.png";

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
    title: "Zuletzt überprüft",
    dataIndex: "checkedAt",
    key: "checkedAt",
    render: (date: Date) => date.toLocaleString(),
  },
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
      Hol deine Dokumente am Vogeliusweg 12/12.1.3, 33100 Paderborn ab. Siehe
      Karte unten. (Bitte probiere nicht nach 23 Uhr und nicht vor 6:30 Uhr zu
      kommen. Du kannst die Dokumente natürlich schon ausdrucken, aber dann
      später abholen.)
    </li>
  </ol>
);

const ServiceStatus = ({ healthStats }: ServiceStatusProps) => {
  const now = new Date();
  const server: HealthStatsRecord = {
    key: "1",
    feature: "Druckserver ist online",
    status: false,
    checkedAt: now,
  };
  const printer: HealthStatsRecord = {
    key: "2",
    feature: "Drucker ist verbunden",
    status: false,
    checkedAt: now,
  };
  const welcome: HealthStatsRecord = {
    key: "3",
    feature: "Kann ich die Dokumente jetzt abholen?",
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
            <ServiceStatus healthStats={healthStats} />
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
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCdAgrKsZH0EVltMS1uOE6sJxIZzB4H1X8&q=The+Prince:+almost-24-hour+printing+service"
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
