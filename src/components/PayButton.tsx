import Big from "big.js";
import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useMutation, gql } from "@apollo/client";
import { message, Modal } from "antd";

import { Loading } from "./Loading";

interface PayProps {
  amount: Big;
  newBalance?: (balance: Big) => void;
}

const TOP_UP = gql`
  mutation TopUp($orderId: String!, $amount: Float!) {
    topUp(input: { orderId: $orderId, amount: $amount }) {
      customer {
        balance
      }
    }
  }
`;

export const PayButton = ({ amount, newBalance }: PayProps) => {
  const [loading, setLoading] = useState(false);
  const [topUp] = useMutation(TOP_UP);

  return (
    <>
      <PayPalButton
        amount={amount.toString()}
        onApprove={async ({ orderID }: any) => {
          setLoading(true);

          const { data, errors } = await topUp({
            variables: {
              orderId: orderID,
              amount: parseFloat(amount.toString()),
            },
          });

          setLoading(false);

          if (errors) {
            message.error(
              `Failed to top up your wallet: ${errors[0].message}`,
              0
            );
            return;
          }

          if (newBalance) {
            newBalance(new Big(data.topUp.customer.balance));
          }
        }}
        options={{
          currency: "EUR",
          clientId:
            "AWhf7-rhZ4ySjSb7Q1xqTG_sIxZ3zjJTiqmU8sqP1AnEIT82ZI8_O046k6Hwi6jbpvzKkRQtZ_1UEiNs",
        }}
      />
      <Modal
        className="undo-info"
        title="Topping up your wallet"
        visible={loading}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        closable={false}
      >
        <Loading text="Please wait while we're adjusting your new balance." />
      </Modal>
    </>
  );
};
