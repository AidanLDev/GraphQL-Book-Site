import React from "react";
import { graphql } from "react-apollo";
import * as queries from "../../graphql/queries";

import styles from "./Style.module.scss";

const bookList = props => {
  console.log(props);
  return (
    <div>
      <ul className={styles.bookList}>
        <li>Book name</li>
      </ul>
    </div>
  );
};

//  Bind getBooksQuery to our bookList component
export default graphql(queries.getBooksQuery)(bookList);
