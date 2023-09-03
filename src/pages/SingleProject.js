import { useState, useEffect, createElement } from "react";
import { useParams } from "react-router-dom";

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

    return t.map((item, i) => {
      const t = createElement(
        item[1].tag,
        { className: item[1].className, key: i },
        item[1].text
      )

      return (
        <>
          {t}
        </>
      )
    }) 
  }

  const article = createArticle()

  return (
    <main className="main__content">
      <div className="container">
        <p>
          article project #{id}
        </p>
        {article.map(item => {
          return item;
        })}
      </div>
    </main>
  )
}

export default SingleProject;