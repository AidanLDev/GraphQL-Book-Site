import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../../graphql/queries";

import styles from "./Style.module.scss";

const BookList = props => {
  // TODO: make helper function that does this (too much replication)
  const displayBooks = () => {
    let data = props.data;
    if (data.loading) {
      // TODO: Spinner here
      return <p>Loading books...</p>;
    } else if (data.loading === false && data.books === undefined) {
      return <p>No data...</p>;
    } else {
      return data.books.map(book => <li key={book.id}>{book.name}</li>);
    }
  };
  return (
    <div>
      <h1>To read list</h1>
      <ul className={styles.bookList}>{displayBooks()}</ul>
    </div>
  );
};

//  Bind getBooksQuery to our bookList component
export default graphql(getBooksQuery)(BookList);
