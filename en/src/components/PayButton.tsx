import Big from "big.js";
import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useMutation, gql } from "@apollo/client";
import { message } from "antd";

import { Loading } from "./Loading";
import config from "../config";

interface PayProps {
  amount: Big;

  onBalanceUpdate?(balance: Big): void;
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

export const PayButton = ({ amount, onBalanceUpdate }: PayProps) => {
  const [loading, setLoading] = useState(false);
  const [topUp] = useMutation(TOP_UP);

  return (
    <>
      <PayPalButton
        amount={amount.toString()}
        onApprove={async ({ orderID }: any) => {
          setLoading(true);

          let mutationResult: any;
          try {
            mutationResult = await topUp({
              variables: {
                orderId: orderID,
                amount: parseFloat(amount.toString())
              }
            });
          } catch (err) {
            setLoading(false);
            message.error(err.message);
            return;
          }

          const { data, errors } = mutationResult;

          setLoading(false);

          if (errors) {
            message.error(
              `Failed to top up your wallet: ${errors[0].message}`,
              0
            );
            return;
          }

          if (onBalanceUpdate) {
            onBalanceUpdate(new Big(data.topUp.customer.balance));
          }
        }}
        options={{
          currency: config.paypal.CURRENCY,
          clientId: config.paypal.CLIENT_ID
        }}
      />
      <Loading
        title="Topping up your wallet"
        loading={loading}
        text="Please wait while we're adjusting your new balance."
      />
    </>
  );
};
