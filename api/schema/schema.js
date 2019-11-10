const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

// Query used from the frontend to get db data
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
      }
    }
  })
});

module.exports = new GraphQLSchema({
  // Defining the queries we can use from the FE
  query: RootQuery
});
