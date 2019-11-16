import React from "react";
import { graphql } from "react-apollo";
import * as queries from "../../graphql/queries";

import styles from "./Style.module.scss";

const addBook = props => {
  const displayAuthors = () => {
    let data = props.data;
    if (data.loading) {
      // TODO: Replace me with a spinner
      return <option disabled>Loading Authors.....</option>;
    } else if (data.loading === false && data.authors === undefined) {
      return <option disabledn>No data...</option>;
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
  return (
    <div className={styles.addBook}>
      <h1>Add book</h1>
      <form className={styles.form}>
        <label>Book name</label>
        <input type="text" />
        <label>Genre</label>
        <input type="text" />
        <label>Author</label>
        <select>
          <option disabled>Select an author</option>
          {displayAuthors()}
        </select>

        <button>ADD</button>
      </form>
    </div>
  );
};

export default graphql(queries.getAuthorsQuery)(addBook);
