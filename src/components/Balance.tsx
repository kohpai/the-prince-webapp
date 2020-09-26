import React, { useEffect, useState } from "react";
import Big from "big.js";
import {
  Collapse,
  InputNumber,
  Row,
  Col,
  Space,
  Typography,
  message,
} from "antd";
import { gql, useMutation } from "@apollo/client";

import { PayButton } from "./PayButton";

const { Panel } = Collapse;
const { Title } = Typography;

const CURRENT_USER = gql`
  mutation CurrentUser {
    currentUser(input: {}) {
      customer {
        balance
      }
    }
  }
`;

export const Balance = () => {
  const minAmount = 5;
  const [currentUser] = useMutation(CURRENT_USER);
  const [balance, setBalance] = useState<Big>(new Big(0));
  useEffect(() => {
    const main = async () => {
      const { data, errors } = await currentUser();

      if (errors) {
        message.error(`Failed to get your balance: ${errors[0].message}`, 0);
        return;
      }

      setBalance(new Big(data.currentUser.customer.balance));
    };
    main();
  }, [currentUser]);

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
              <PayButton
                amount={amount}
                newBalance={(b) => {
                  setBalance(b);
                  message.success("Your balance is adjusted.", 3);
                }}
              />
            </Col>
          </Row>
        </Space>
      </Panel>
    </Collapse>
  );
};
