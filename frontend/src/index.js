import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./styles/global.scss";
import App from "./containers/App";

// Apollo client setup
// const networkInterface = createNetworkInterface({

// });
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
