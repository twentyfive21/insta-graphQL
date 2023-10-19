import {
    HttpLink,
    InMemoryCache,
    split,
  } from "@apollo/client";
  import { getMainDefinition } from "@apollo/client/utilities";
  import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
  import { createClient } from "graphql-ws";

//   https://relaxing-silkworm-83.hasura.app/v1/graphql