import React from "react";
import { graphql } from "react-apollo";

import styles from "./Style.module.scss";

const addBook = props => {
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
          <option>Select Author</option>
        </select>
      </form>
    </div>
  );
};

export default addBook;
