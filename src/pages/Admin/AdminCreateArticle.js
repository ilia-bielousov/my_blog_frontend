import { createElement, Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { statusCreatingCard, resetComponentToArticle, resetPreviewContentAnArticle, changeBanAddElement } from "../../store/adminReducer";
import PanelForAddtags from "./components/PanelForAddtags";
import ModalAfterCreatingArticle from './components/ModalAfterCreatingArticle';
// images
import arrow from './../../assets/images/arrow-history.svg';
import list from './../../assets/images/list.svg';
import paragraph from './../../assets/images/paragraph.svg';
import picture from './../../assets/images/picture.svg';
import video from './../../assets/images/video.svg';
import code from './../../assets/images/code.svg';

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
      // alert('Сначала нужно создать карточку, только потом статью')
      setRedirect(true);
    }
    // нужно проверить, если обновили страницу и нет айди в редаксе, найти карточку и удалить ее в монго
  }, [dispatch]);

  // if (redirect) {
  //   return <Navigate to='/admin' />;
  // }

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
        <div className="panel p-2">
          <div className="flex justify-between items-center p-2 bg-blue-700 text-white rounded-xl mb-1">
            <h3 className="p-2 italic text-xl">
              Panel My Blog
            </h3>
            <div className="flex-grow">

            </div>
            <div className="flex gap-2 mr-2">
              <span className="p-1 cursor-pointer">
                <img src={arrow} alt="arrow back" className="w-8" />
              </span>
              <span className="p-1 transform scale-x-[-1] cursor-pointer">
                <img src={arrow} alt="arrow forward" className="w-8" />
              </span>
            </div>
            <button type="submit" className="p-2 bg-white text-slate-600 rounded-xl font-bold active:bg-slate-200 ">
              Опубликовать
            </button>
          </div>
          <div className="flex"> {/* нужо будет добавить svg картики */}
            <button className="panel__btn" title="добавить заголовок 1 уровня">
              H1
            </button>
            <button className="panel__btn" title="добавить заголовок 2 уровня">
              H2
            </button>
            <button className="panel__btn" title="добавить заголовок 3 уровня">
              H3
            </button>
            <button className="panel__btn">
              <img src={list} className="" alt="list" title="добавить список" />
            </button>
            <button className="panel__btn">
              <img src={paragraph} alt="paragraph" title="добавить параграф" />
            </button>
            <button className="w-12">
            </button>
            <button className="panel__btn">
              <img src={picture} alt="download" title="добавить картинку" />
            </button>
            <button className="panel__btn">
              <img src={video} alt="download video" title="добавить видео" />
            </button>
            <button className="panel__btn">
              <img src={code} alt="code" title="добавить блок кода" />
            </button>
          </div>
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