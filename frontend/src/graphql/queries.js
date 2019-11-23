import { gql } from "apollo-boost";

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
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

export const deleteBookMutation = gql`
  mutation($bookId: ID!) {
    deleteBook(id: $bookId) {
      name
    }
  }
`;

export const editBookMutation = gql`
  mutation($bookId: ID!, $name: String!, $genre: String, $authorId: ID!) {
    editBook(id: $bookId, name: $name, genre: $genre, authorId: $authorId) {
      id
      authorId
    }
  }
`;
