import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

let fromBackUrl = "http://api_rest-back-1:5000";
let fromFrontUrl = "http://localhost:5000";

if (process.env.BACKEND_URL) fromFrontUrl = process.env.BACKEND_URL;

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const api = {
  ssr: new ApolloClient({
    uri: `${fromBackUrl}/graphql`,
    cache: new InMemoryCache(),
    defaultOptions,
  }),
  csr: new ApolloClient({
    uri: `${fromFrontUrl}/graphql`,
    cache: new InMemoryCache(),
  }),
};
