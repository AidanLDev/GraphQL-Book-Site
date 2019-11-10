const express = require("express");
const PORT = 4000;
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true /* Allows use of the graphiql browser IDE */
  })
);

app.listen(PORT, () => console.log(`Running on port http://localhost:${PORT}`));
