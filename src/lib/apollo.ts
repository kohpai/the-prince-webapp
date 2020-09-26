import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import config from "../config";
import firebase from "./firebase";

let user: firebase.User | null = null;

firebase
  .auth()
  .onAuthStateChanged((signedInUser) =>
    signedInUser ? (user = signedInUser) : (user = null)
  );

const httpLink = createHttpLink({
  uri: `${config.API_URL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await user?.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
});

export default client;
