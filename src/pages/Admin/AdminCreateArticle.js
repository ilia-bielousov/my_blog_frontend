import { createElement, Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { statusCreatingCard, resetComponentToArticle, resetPreviewContentAnArticle, changeBanAddElement } from "../../store/adminReducer";
import PanelForAddtags from "./components/PanelForAddtags";
import ModalAfterCreatingArticle from './components/ModalAfterCreatingArticle';

const AdminCreateArticle = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const elements = useSelector(state => state.admin.creatingArticle.elements);
  const previewContent = useSelector(state => state.admin.creatingArticle.previewElements);
  const statusCreatingArticle = useSelector(state => state.admin.statusSendArticle);
  const idArticle = useSelector(state => state.admin.id);
  // посмотреть какой redux я не использую, короче проследить как че работает.
  useEffect(() => {
    if (idArticle) {
      dispatch(statusCreatingCard(false));
      dispatch(resetComponentToArticle());
      dispatch(resetPreviewContentAnArticle());
      dispatch(changeBanAddElement(false));
    } else {
      alert('Сначала нужно создать карточку, только потом статью')
      setRedirect(true);
    }
    // нужно проверить, если обновили страницу и нет айди в редаксе, найти карточку и удалить ее в монго
  }, [dispatch]);

  if (redirect) {
    return <Navigate to='/admin' />;
  }

  return (
    <main className="flex flex-1 pl-72">
      <aside className="flex-1 p-3">
        <h2 className="text-3xl font-bold mb-5 text-center">
          Создание статьи
        </h2>
        <div className="flex flex-1 flex-col gap-5 mb-10 items-center">
          {elements.map((item, i) => {
            return (
              <form className="form__item" key={i}>
                {item}
              </form>
            )
          })}
        </div>
        <div className="flex justify-center">
          <PanelForAddtags />
        </div>
      </aside>
      <article className="flex-1 p-3">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Предварительный просмотр статьи
        </h2>
        {previewContent.map((item, i) => {
          return (
            <Fragment key={i}>
              {createElement(
                item.tag,
                { className: item.className, src: item.image, alt: item.alt },
                item.text
              )}
            </Fragment>
          )
        })}
      </article>
      {statusCreatingArticle ? <ModalAfterCreatingArticle /> : null}
    </main>
  );
};

export default AdminCreateArticle;