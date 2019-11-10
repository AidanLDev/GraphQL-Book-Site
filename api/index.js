const express = require("express");
const PORT = 4000;
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const config = require("config");
// const DBPassword = require("./dbpw");

const app = express();

/*
//  Save the following (with your DB users PW) in a javaScript file called dbpw
  const pw = "<your PW>";
  module.exports = pw;
*/

/*  Connecting to MongoDB  */
const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));
// mongoose.connect(
//   `mongodb+srv://aidanrw${DBPassword}@graphql-vowny.mongodb.net/test?retryWrites=true&w=majority`
// );

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true /* Allows use of the graphiql browser IDE */
  })
);

app.listen(PORT, () => console.log(`Running on port http://localhost:${PORT}`));
