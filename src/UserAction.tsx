import React, { useState } from "react";
import { Collapse, InputNumber, Row, Col, Space } from "antd";
import Big from "big.js";

import { PayButton } from "./PayButton";

const { Panel } = Collapse;

interface BalanceProps {
  balance: Big;
}

const Balance = ({ balance }: BalanceProps) => {
  const [amount, setAmount] = useState(new Big(5));
  return (
    <Collapse style={{ textAlign: "left" }}>
      <Panel header={`Current balance: ${balance.toString()} €`} key="1">
        <Space direction="vertical" size="large">
          <Row>
            <Col span={24}>
              <Space direction="horizontal">
                Top up
                <InputNumber
                  min={parseFloat(amount.toString())}
                  defaultValue={parseFloat(amount.toString())}
                  decimalSeparator=","
                  precision={2}
                  onChange={(val) => setAmount(new Big(val || 0))}
                />
                €.
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <PayButton amount={amount} />
            </Col>
          </Row>
        </Space>
      </Panel>
    </Collapse>
  );
};

export const UserAction = () => <Balance balance={new Big(10.0)} />;
