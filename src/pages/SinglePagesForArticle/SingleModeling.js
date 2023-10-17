import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import createArticle from "../../utilities/utilities";
import './pages.css';

const SingleModeling = () => {
  const { id } = useParams();
  const [text, setText] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/modeling/${id}`)
      .then(res => res.json())
      .then(data => {
        setText(data);
      });
  }, []);

  const article = createArticle(text);

  return (
    <main className="main__content">
      <div className="container">
        <h2 className="main__page-title">
          article Modeling #{id}
        </h2>
        {article.map((item, i) => {
          return (
            <Fragment key={i}>
              {item}
            </Fragment>
          );
        })}
      </div>
    </main>
  )
}

export default SingleModeling;