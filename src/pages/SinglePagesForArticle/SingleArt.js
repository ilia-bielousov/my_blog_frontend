import { useState, useEffect, createElement, Fragment } from "react";
import { useParams } from "react-router-dom";

// нет базы данных, поэтому это только отдельный файл.

const SingleArt = () => {
  const { id } = useParams();
  const [text, setText] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/art/${id}`)
      .then(res => res.json())
      .then(data => {
        setText(data);
      });
  }, []);

  const createArticle = () => {
    const t = Object.entries(text);

    console.log(t);

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
        <h2 className="main__page-title">
          article Art #{id}
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
};

export default SingleArt;