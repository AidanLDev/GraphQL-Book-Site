import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../../../graphql/queries";
import styles from "./Style.module.scss";

const BookDetails = props => {
  const displayBookDetails = () => {
    const book = props.data && props.data.book;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>Genre: {book.genre}</p>
          <p>Author: {book.author.name}</p>
          <p>Other books by {book.author.name}</p>
          <ul className={styles.otherBooks}>
            {book.author.books.map(item => (
              <li key={item.id} style={{ cursor: "context-menu" }}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return <div className={styles.bookDetails}>{displayBookDetails()}</div>;
};

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
