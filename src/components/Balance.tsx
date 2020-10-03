import React, { useState } from "react";
import Big from "big.js";
import { Collapse, InputNumber, Row, Col, Space, Typography } from "antd";

import { PayButton } from "./PayButton";
import { HealthStats } from "./commonTypes";

interface BalanceProps {
  healthStats?: HealthStats;
  balance: Big;
  onBalanceUpdate(balance: Big): void;
}

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const minAmount = 5;

export const Balance = ({
  healthStats,
  balance,
  onBalanceUpdate,
}: BalanceProps) => {
  const [amount, setAmount] = useState(new Big(minAmount));

  return (
    <Collapse>
      <Panel
        header={<Title level={4}>Dein Guthaben: {balance.toString()} €</Title>}
        key="1"
      >
        <Space className="expand-space" direction="vertical" size="large">
          <Row>
            <Col span={24}>
              <Title level={4}>Lade dein Guthaben auf</Title>
              <Space direction="horizontal">
                Betrag
                <InputNumber
                  min={minAmount}
                  defaultValue={minAmount}
                  decimalSeparator=","
                  precision={2}
                  onChange={(val) => setAmount(new Big(val || 0))}
                  disabled={!Boolean(healthStats)}
                />
                €.
              </Space>
            </Col>
          </Row>
          <Row>
            <Col className="undo-info" span={24}>
              {healthStats ? (
                <PayButton amount={amount} onBalanceUpdate={onBalanceUpdate} />
              ) : (
                <Paragraph>
                  Du kannst dein Guthaben, solange der Server offline ist, nicht
                  aufladen{" "}
                  <span role="img" aria-label="grinning-face">
                    😞
                  </span>
                  . Überprüfe den Status auf der Homepage und probier es
                  nochmal.
                </Paragraph>
              )}
            </Col>
          </Row>
        </Space>
      </Panel>
    </Collapse>
  );
};
