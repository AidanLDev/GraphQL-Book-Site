import React from "react";

import styles from "./Style.module.scss";

const bookList = props => {
  return (
    <div>
      <ul className={styles.bookList}>
        <li>Book name</li>
      </ul>
    </div>
  );
};

export default bookList;
