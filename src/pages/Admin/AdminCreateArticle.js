import { createElement, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { statusCreatingCard, resetComponentToArticle, resetPreviewContentAnArticle, changeBanAddElement } from "../../store/adminReducer";
import PanelForAddtags from "./components/PanelForAddtags";
import ModalAfterCreatingArticle from './components/ModalAfterCreatingArticle';

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
  }, [dispatch]);

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
                { className: item.className },
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