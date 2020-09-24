import Big from "big.js";
import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useMutation, gql } from "@apollo/client";

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
  const [topUp] = useMutation(TOP_UP);

  return (
    <PayPalButton
      amount={amount.toString()}
      onApprove={async ({ orderID }: any) => {
        const { data, errors } = await topUp({
          variables: {
            orderId: orderID,
            amount: parseFloat(amount.toString()),
          },
        });
        console.log("kohpai-errors", errors);
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
  );
};
