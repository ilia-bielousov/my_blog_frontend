import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import axios from 'axios';

import { fetchArticle } from "../../store/asyncAction/article";

import NewTagForEdit from "./components/NewTagForEdit";
import Modal from "./components/Modal";
import PanelTags from "./components/PanelTags";


const AdminEditSingleArticle = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [modalActive, setModalActive] = useState({});
  const [redirect, setRedirect] = useState(false);
  const article = useSelector(state => state.client.article);

  useEffect(() => {
    dispatch(fetchArticle(id, 'admin/edit-article'));
  }, []);

  const sendEditArticle = (e) => {
    e.preventDefault();

    axios.patch(`http://localhost:4000/admin/edit-article`, article)
      .then(res => {
        if (res.data.status === 200) {
          setModalActive({ open: true, error: false });
        }
      })
      .catch(err => {
        if (err.response.data.status === 500) {
          setModalActive({ open: true, error: true });
        }
      });
  }

  const renderModal = () => {
    return (
      <>
        <p className="mb-3">Статья успешно отредактирована, нажмите на кнопку, чтобы выйти.</p>
        <input
          onClick={() => setRedirect(true)} // переписать, нахер нужен этот редирект
          className="block mx-auto p-2 border rounded-lg transition hover:bg-slate-100 cursor-pointer active:bg-slate-200"
          type="submit"
          value="тыкать сюда"
        />
      </>
    )
  }

  const renderModalError = () => {
    return (
      <>
        <p className="">
          Появилась ошибка, попробуйте обновить страницу.
        </p>
      </>
    )
  }

  if (redirect) {
    return <Navigate to='/admin/edit-article' />;
  }

  return (
    <>
      <main className="flex-1 pl-72">
        <article className="max-w-3xl p-5">
          <h1 className="text-3xl font-bold mb-2">
            Редактирование статьи
          </h1>
          <form onSubmit={sendEditArticle}>
            {article ? article.content.map((item, key) => {
              return (
                <NewTagForEdit
                  key={key}
                  tag={item.tag}
                  text={item.text}
                  className={item.className}
                  id={item.id}
                  list={item.list}
                  language={item.language}
                  article={article}
                />
              )
            }) : null}
            <input
              type="submit"
              value="подтвердить"
              className="mx-auto block mt-5 py-3 px-6 border rounded-lg cursor-pointer hover:bg-slate-100 transition active:bg-slate-200"
            />
          </form>
        </article>
        {/* <PanelTags /> чуть позже еще и с добавлением поработаю */}
      </main >
      <>
        {modalActive.open ?
          <Modal
          >
            {!modalActive.error ? renderModal() : renderModalError()}
          </Modal> :
          null
        }
      </>
    </>
  );
};

export default AdminEditSingleArticle;