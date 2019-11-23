import React, { useState } from "react";
import { graphql } from "react-apollo";
import { TiTickOutline } from "react-icons/ti";
import { flowRight } from "lodash";
import { getBooksQuery, deleteBookMutation } from "../../graphql/queries";
import BookDetails from "./BookDetails/BookDetails";

import styles from "./Style.module.scss";

const BookList = props => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDelteBook = book => {
    const bookId = book.id;
    props.deleteBook({
      variables: { bookId },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };

  const handleSelectBook = (e, bookId) => {
    setSelectedBook(bookId);
  };

  // TODO: make helper function that does this (too much replication)
  const displayBooks = () => {
    let data = props.getBooks;
    if (data.loading) {
      // TODO: Spinner here
      return <p>Loading books...</p>;
    } else if (data.loading === false && data.books === undefined) {
      return <p>No data...</p>;
    } else {
      return data.books.map(book => (
        <li key={book.id} onClick={e => handleSelectBook(e, book.id)}>
          {book.name}{" "}
          <span>
            {" "}
            | <TiTickOutline onClick={() => handleDelteBook(book)} />
          </span>
        </li>
      ));
    }
  };
  return (
    <div className={styles.bookList}>
      <h1>To read list</h1>
      {/* <h3>Click titles for book details</h3> */}
      <ul className={styles.list}>{displayBooks()}</ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

//  Bind getBooksQuery to our bookList component
export default flowRight(
  graphql(getBooksQuery, { name: "getBooks" }),
  graphql(deleteBookMutation, { name: "deleteBook" })
)(BookList);
