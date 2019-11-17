import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../../graphql/queries";
import BookDetails from "./BookDetails/BookDetails";

import styles from "./Style.module.scss";

const BookList = props => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelectBook = (e, bookId) => {
    setSelectedBook(bookId);
  };

  // TODO: make helper function that does this (too much replication)
  const displayBooks = () => {
    let data = props.data;
    if (data.loading) {
      // TODO: Spinner here
      return <p>Loading books...</p>;
    } else if (data.loading === false && data.books === undefined) {
      return <p>No data...</p>;
    } else {
      return data.books.map(book => (
        <li key={book.id} onClick={e => handleSelectBook(e, book.id)}>
          {book.name}
        </li>
      ));
    }
  };
  return (
    <div className={styles.bookList}>
      <h1>To read list</h1>
      <h3>Click for book details</h3>
      <ul>{displayBooks()}</ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

//  Bind getBooksQuery to our bookList component
export default graphql(getBooksQuery)(BookList);
