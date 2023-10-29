import { createElement, useState, Fragment } from "react";
import PanelForAddtags from "../components/for_form/PanelForAddtags";
import { request } from './../../../utilities/request';

import './AdminCreateArticle.css';
// сначала нам нужно создать карточку, а только потом статью

const AdminCreateArticle = () => {
  const [elements, setElements] = useState([]);
  const [contentInElements, setContentInElements] = useState([]);

  const sendArticletoDb = () => {
    request('POST', 'create-article', contentInElements);
  };

  return (
    <main className="main">
      <div className="container__admin">
        <div className="main__inner">
          <aside className="main__create-article">
            <h2 className="main__create-title">
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
              contentInElements={contentInElements}
              setContentInElements={setContentInElements}
              sendArticletoDb={sendArticletoDb}
            />
          </aside>
          <article className="main__preview-article">
            <h2 className="main__create-title">Preview of the article</h2>
            {contentInElements.map((item, i) => {
              return (
                <Fragment key={i}>
                  {createElement(
                    item.tag,
                    { className: item.className },
                    item.text
                  )}
                </Fragment>
              )
            })}
          </article>
        </div>
      </div>
    </main>
  );
};

export default AdminCreateArticle;