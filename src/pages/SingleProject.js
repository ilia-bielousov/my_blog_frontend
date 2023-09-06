import { useState, useEffect, createElement, Fragment } from "react";
import { useParams } from "react-router-dom";

import './pages.css';

const SingleProject = () => {
  const { id } = useParams();
  const [text, setText] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        setText(data);
      });
  }, []);

  const createArticle = () => {
    const t = Object.entries(text);

    return t.map(item => {
      const elements = createElement(
        item[1].tag,
        { className: item[1].className, src: (item[1].src ? item[1].src : null) },
        item[1].text,
      )

      return (
        <>
          {elements}
        </>
      )
    })
  }

  const article = createArticle()

  return (
    <main className="main__content">
      <div className="container">
        <h1 className="main__page-title">
          article project #{id}
        </h1>
        <div className="main__article">
          {article.map((item, i) => {
            return (
              <Fragment key={i}>
                {item}
              </Fragment>
            );
          })}
        </div>
      </div>
    </main>
  )
}

export default SingleProject;

