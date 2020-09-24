export default {
  API_URL: process.env.REACT_APP_API_URL || "https://localhost:8443",
  paypal: {
    CLIENT_ID:
      process.env.REACT_APP_PAYPAL_CLIENT_ID ||
      "AWhf7-rhZ4ySjSb7Q1xqTG_sIxZ3zjJTiqmU8sqP1AnEIT82ZI8_O046k6Hwi6jbpvzKkRQtZ_1UEiNs",
    CURRENCY: process.env.REACT_APP_PAYPAL_CURRENCY || "EUR",
  },
};
