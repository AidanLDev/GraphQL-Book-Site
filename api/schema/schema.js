const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../db/models/book");
const Author = require("../db/models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// Dummy data
// let books = [
//   { id: "1", name: "1984", genre: "Distopia", authorId: "1" },
//   { id: "2", name: "Brave New World", genre: "Distopia", authorId: "2" },
//   { id: "3", name: "Neuromancer", genre: "Sci-Fi", authorId: "3" },
//   { id: "4", name: "Island", genre: "Sci-Fi", authorId: "2" },
//   { id: "5", name: "Animal Farm", genre: "Distopia", authorId: "1" }
// ];

// let authors = [
//   { id: "1", name: "Geroge Orwell", age: 47 },
//   { id: "2", name: "Aldous Huxley", age: 69 },
//   { id: "3", name: "William Gibson", age: 71 }
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // Parent refers to the book
        // return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      // Use GraphQL list if theres a many to one relationship (1 author might have a lot of books in the DB)
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

// Query used to transfer the 'graph' and interact with data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    // Get a single book based on ID
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      // Resolve, the function to query the DB/any other data source
      resolve(parent, args) {
        // args.id
        // return _.find(books, { id: args.id });
      }
    },
    // Get a list of all books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      }
    }
  })
});

//  Mutations run queries to update/delete/insert data into our DB
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        //  get author from our DB schema
        let author = new Author({
          name: args.name,
          age: args.age
        });
        //  Save author to our mongoDB
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  })
});

module.exports = new GraphQLSchema({
  // Defining the queries we can use from the FE
  query: RootQuery,
  mutation: Mutation
});
