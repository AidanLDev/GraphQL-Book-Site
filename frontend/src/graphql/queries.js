import { gql } from "apollo-boost";

export const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

export const getAuthorsQuery = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation {
    addBook(name: "", genre: "", authorId: "") {
      name
      id
    }
  }
`;
