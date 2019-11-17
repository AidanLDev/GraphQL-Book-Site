import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight } from "lodash";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../../graphql/queries";

import styles from "./Style.module.scss";

const AddBook = props => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const displayAuthors = () => {
    let data = props.getAuthorsQuery;
    if (data.loading) {
      // TODO: Replace me with a spinner
      return <option disabled>Loading Authors.....</option>;
    } else if (data.loading === false && data.authors === undefined) {
      return <option disabled>No data...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  // TODO: Move this to a helper function
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    field(value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    // To fetch the booklist after updating the db table use 'refetchQueries'
    props.addBookMutation({
      variables: { name, genre, authorId },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };

  return (
    <div className={styles.addBook}>
      <h1>Add a book</h1>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <label>Book name</label>
        <input
          type="text"
          onChange={e => handleInputChange(e, setName)}
          value={name}
        />
        <label>Genre</label>
        <input
          type="text"
          onChange={e => handleInputChange(e, setGenre)}
          value={genre}
        />
        <label>Author</label>
        <select onChange={e => handleInputChange(e, setAuthorId)}>
          <option disabled>Select an author</option>
          {displayAuthors()}
        </select>
        {/* Add toast */}
        <button>ADD</button>
      </form>
    </div>
  );
};

// Use flowRight to bind multiple graphQL queries to the AddBook component
export default flowRight(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
