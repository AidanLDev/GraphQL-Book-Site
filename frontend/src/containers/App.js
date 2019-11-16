import React from "react";
//  Components
import BookList from "../components/Booklist/Booklist";
import styles from "./Style.module.scss";

function App() {
  return (
    <div className={styles.appContainer}>
      <h1>To read list</h1>
      <BookList />
    </div>
  );
}

export default App;
