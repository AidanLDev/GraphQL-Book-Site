const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Dummy data
let books = [
  { name: "1984", genre: "Distopia", id: "1" },
  { name: "Brave New World", genre: "Distopia", id: "2" },
  { name: "Neuromancer", genre: "Sci-Fi", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// Query used to transfer the 'graph' and interact with data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    // Name of the query
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString }
      },
      // Resolve gets data from the db
      resolve(parent, args) {
        // args.id
        return _.find(books, { id: args.id });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  // Defining the queries we can use from the FE
  query: RootQuery
});
