import { createElement, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { statusCreatingCard, resetComponentToArticle, resetPreviewContentAnArticle, changeBanAddElement } from "../../../store/adminReducer";
import PanelForAddtags from "../components/for_form/PanelForAddtags";
import ModalAfterCreatingArticle from './../components/ModalAfterCreatingArticle/ModalAfterCreatingArticle';
import './AdminCreateArticle.css';

const AdminCreateArticle = () => {
  const dispatch = useDispatch();
  const elements = useSelector(state => state.admin.creatingArticle.elements);
  const previewContent = useSelector(state => state.admin.creatingArticle.previewElements);
  const statusCreatingArticle = useSelector(state => state.admin.statusSendArticle);

  useEffect(() => {
    dispatch(statusCreatingCard(false));
    dispatch(resetComponentToArticle());
    dispatch(resetPreviewContentAnArticle());
    dispatch(changeBanAddElement(false));
    // нужно проверить, если обновили страницу и нет айди в редаксе, найти карточку и удалить ее в монго
  }, []);

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
      {statusCreatingArticle ? <ModalAfterCreatingArticle /> : null}
    </main>
  );
};

export default AdminCreateArticle;