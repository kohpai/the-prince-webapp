import React, { useState } from "react";
import Big from "big.js";
import { Collapse, InputNumber, Row, Col, Space, Typography } from "antd";

import { PayButton } from "./PayButton";

interface BalanceProps {
  balance: Big;
  onBalanceUpdate(balance: Big): void;
}

const { Panel } = Collapse;
const { Title } = Typography;

const minAmount = 5;

export const Balance = ({ balance, onBalanceUpdate }: BalanceProps) => {
  const [amount, setAmount] = useState(new Big(minAmount));

  return (
    <Collapse>
      <Panel
        header={
          <Title level={4}>Current balance: {balance.toString()} €</Title>
        }
        key="1"
      >
        <Space className="expand-space" direction="vertical" size="large">
          <Row>
            <Col span={24}>
              <Title level={4}>Top up your wallet</Title>
              <Space direction="horizontal">
                amount
                <InputNumber
                  min={minAmount}
                  defaultValue={minAmount}
                  decimalSeparator=","
                  precision={2}
                  onChange={(val) => setAmount(new Big(val || 0))}
                />
                €.
              </Space>
            </Col>
          </Row>
          <Row>
            <Col className="undo-info" span={24}>
              <PayButton amount={amount} onBalanceUpdate={onBalanceUpdate} />
            </Col>
          </Row>
        </Space>
      </Panel>
    </Collapse>
  );
};
