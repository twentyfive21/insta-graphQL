import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// HTTP link that connects to GraphQL server's HTTP endpoint.
const httpLink = new HttpLink({
  uri: "https://relaxing-silkworm-83.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": import.meta.env.VITE_DB_KEY,
  },
});

// WebSocket link for handling GraphQL subscriptions using the graphql-ws library.
const wsLink = new GraphQLWsLink(
  createClient({
    // WebSocket URL with 'wss' scheme
    url: "wss://relaxing-silkworm-83.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": import.meta.env.VITE_DB_KEY,
      },
    },
    options: {
      reconnect: true, // Enable reconnection in case of connection loss.
    },
  })
);

// Create a split link that routes requests to the appropriate link (HTTP or WebSocket)
// based on the type of operation (query/mutation or subscription).
const splitLink = split(
  // Determine if the operation is a subscription by examining its definition.
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // Use the WebSocket link for subscriptions.
  httpLink // Use the HTTP link for queries and mutations.
);

// Create an Apollo Client instance that uses the split link and an in-memory cache.
const client = new ApolloClient({
  link: splitLink, // Use the split link to route requests.
  cache: new InMemoryCache(), // Use an in-memory cache for managing data.
});

export default client;

// ignore
// Cumulative Data Pass-Through
// 189.93MB of 100MB nov 15 