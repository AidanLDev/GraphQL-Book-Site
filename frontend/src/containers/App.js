import React from "react";
//  Components
// TODO: Alias components/containers/styles without using webpack
import BookList from "../components/BookList/BookList";
import AddBook from "../components/AddBook/AddBook";
import styles from "./Style.module.scss";

function App() {
  return (
    <div className={styles.appContainer}>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
