import React from "react";
//  Components
// TODO: Alias components/containers/styles without using webpack
import BookList from "../components/BookList/BookList";
import AuthorList from "../components/AuthorList/AuthorList";
import AddBook from "../components/AddBook/AddBook";
import styles from "./Style.module.scss";

function App() {
  return (
    <div className={styles.appContainer}>
      <BookList />
      <AuthorList />
      <AddBook />
    </div>
  );
}

export default App;
