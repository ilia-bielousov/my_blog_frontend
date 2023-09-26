import { useState } from "react";
import PanelForAddtags from "../for_form/PanelForAddtags";

import './AdminCreateArticle.css';

const AdminCreateArticle = () => {
  const [elements, setElements] = useState([]);
  const [elementsContent, setElementsContent] = useState([]); // текст внутри элементов

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