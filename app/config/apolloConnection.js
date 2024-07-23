import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/",
});

const authLink = setContext(async (_, { headers }) => {
  const access_token = await SecureStore.getItemAsync("access_token");

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${access_token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
