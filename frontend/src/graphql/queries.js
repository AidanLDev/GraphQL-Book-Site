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

// params in mutation is what we pass to the addBookMutation in the React component
export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
