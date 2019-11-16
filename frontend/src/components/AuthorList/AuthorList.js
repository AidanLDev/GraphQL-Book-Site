import React from "react";
import { graphql } from "react-apollo";
import * as queries from "../../graphql/queries";

const authorList = props => {
  // TODO: make helper function that does this (too much replication)
  const displayAuthors = () => {
    console.log(props);
    let data = props.data;

    if (data.loading) {
      // TODO: Replace me with a loader
      return <p>Loading Authors.....</p>;
    } else {
      return data.authors.map(author => (
        <li key={author.id}>
          Name: {author.name} Age: {author.age}
        </li>
      ));
    }
  };
  return (
    <div>
      <h1>Author List</h1>
      <ul>{displayAuthors()}</ul>
    </div>
  );
};

export default graphql(queries.getAuthorsQuery)(authorList);
