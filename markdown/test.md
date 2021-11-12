```
import useFetch from "../../../services/useFetch";
import { Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "../../../prism/prism.css";

const Snippets = () => {
  const [snippets, setSnippets] = useState("");

  const { data, loading, error } = useFetch(process.env.REACT_APP_SNIPPETS_URL);
  console.log(data, loading, error);
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  });
  useEffect(() => {
    setSnippets(() => data);
  }, [data]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error!!!</h2>;
  }

  return (
    <div>
      {/* <nav>
        {snippets.map((e, index) => {
          return (
            <NavLink key={index} to={`/snippets/${e.name}`}>
              {e.name}
            </NavLink>
          );
        })}
      </nav>
      <Switch>
        {snippets.map((e, index) => {
          return (
            <Route key={index} exact path={`/snippets/${e.name}`}>
              <h2>{e.name}</h2>
            </Route>
          );
        })}
      </Switch> */}
      <ReactMarkdown children={snippets} />
    </div>
  );
};

export default Snippets;
```
