import Big from "big.js";
import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

interface PayProps {
  amount: Big;
}

export const PayButton = ({ amount }: PayProps) => {
  return (
    <PayPalButton
      amount={amount.toString()}
      onSuccess={(details: any, data: any) => console.log(details, data)}
      options={{
        currency: "EUR",
        clientId:
          "AWhf7-rhZ4ySjSb7Q1xqTG_sIxZ3zjJTiqmU8sqP1AnEIT82ZI8_O046k6Hwi6jbpvzKkRQtZ_1UEiNs",
      }}
    />
  );
};
