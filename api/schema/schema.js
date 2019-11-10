const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

// Dummy data
let books = [
  { name: "1984", genre: "Distopia", id: "1" },
  { name: "Brave New World", genre: "Distopia", id: "2" },
  { name: "Neuromancer", genre: "Sci-Fi", id: "3" }
];

let authors = [
  { name: "Geroge Orwell", age: 47, id: "1" },
  { name: "Aldous Huxley", age: 69, id: "2" },
  { name: "William Gibson", age: 71, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
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
        id: { type: GraphQLID }
      },
      // Resolve gets data from the db
      resolve(parent, args) {
        // args.id
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  // Defining the queries we can use from the FE
  query: RootQuery
});
