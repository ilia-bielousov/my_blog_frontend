import { useState } from "react";
import PanelForAddtags from "../components/for_form/PanelForAddtags";

import './AdminCreateArticle.css';
// сначала нам нужно создать карточку, а только потом статью

const AdminCreateArticle = () => {
  const [elements, setElements] = useState([]);

  return (
    <main className="main">
      <div className="container">
        <div className="main__inner">
          <div className="main__create-article">
            <h2 className="">
              Create a article
            </h2>
            <form className="form">
              {elements.map((item, i) => {
                return (
                  <div className="form__item" key={i}>
                    {item}
                  </div>
                )
              })}
            </form>
              <PanelForAddtags 
              elements={elements}
              setElements={setElements}
              />
          </div>
          <article className="main__preview-article">
            <h2 className="">
              Preview of the article
            </h2>
          </article>
        </div>
      </div>
    </main>
  );
};

export default AdminCreateArticle;