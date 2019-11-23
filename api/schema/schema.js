const graphql = require("graphql");
const mongoose = require("mongoose");
const _ = require("lodash");
const Book = require("../db/models/book");
const Author = require("../db/models/author");

const ObjectId = mongoose.Schema.Types.ObjectId;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // Parent refers to the book collection
        return Author.findById(parent.authorId);
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
        return Book.find({ authorId: parent.id });
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
        return Book.findById(args.id);
      }
    },
    // Get a list of all books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // Empty object = get everything
        return Book.find({});
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    },
    editBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = {
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        };
        return Book.updateOne({ _id: args.id }, { $set: book });
      }
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Book.deleteOne({ _id: args.id });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  // Defining the queries we can use from the FE
  query: RootQuery,
  mutation: Mutation
});
