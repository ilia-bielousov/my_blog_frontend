import { createElement, Fragment } from "react";
import { useSelector } from 'react-redux';
import PanelForAddtags from "../components/for_form/PanelForAddtags";

import './AdminCreateArticle.css';

const AdminCreateArticle = () => {
  const elements = useSelector(state => state.admin.creatingArticle.elements);
  const previewContent = useSelector(state => state.admin.creatingArticle.previewElements);

  return (
    <main className="main">
      <div className="container__admin">
        <div className="main__inner">
          <aside className="main__create-article">
            <h2 className="main__create-title">
              Create an article
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
            <PanelForAddtags />
          </aside>
          <article className="main__preview-article">
            <h2 className="main__create-title">
              Preview of the article
            </h2>
            {previewContent.map((item, i) => {
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