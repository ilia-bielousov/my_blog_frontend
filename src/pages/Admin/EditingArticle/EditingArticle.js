import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import axios from 'axios';

import { fetchArticle } from "../../../store/asyncAction/article";
import { removeStateArticle, updateStatusError } from "../../../store/clientReducer";

import NewTagForEdit from "./elements/NewTagForEdit";
import Modal from "../../../components/Modal";

const EditingArticle = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [modalActive, setModalActive] = useState({});
  const [redirect, setRedirect] = useState(false);

  const article = useSelector(state => state.client.article);
  const statusError = useSelector(state => state.client.error);

  useEffect(() => {
    dispatch(removeStateArticle());

    dispatch(updateStatusError())
    dispatch(fetchArticle(id, 'admin/edit-article'));
  }, []);

  const sendEditArticle = (e) => {
    e.preventDefault();

    console.log(article);

    axios.patch(`${process.env.REACT_APP_API_URL}admin/edit-article`, article)
      .then(res => {
        if (res.data.status === 200)
          setModalActive({ open: true, error: false });
      })
      .catch(err => {
        if (err.response.data.status === 500)
          setModalActive({ open: true, error: true });
      });
  }

  const renderModal = () => {
    return (
      <>
        <p className="text-center mb-3">Artykuł został pomyślnie zredagowany, kliknij przycisk, aby cię przekierować.</p>
        <input
          onClick={() => setRedirect(true)}
          className="block mx-auto p-2 border rounded-lg transition hover:bg-slate-100 cursor-pointer active:bg-slate-200"
          type="submit"
          value="tutaj"
        />
      </>
    )
  }

  const renderModalError = () => {
    return (
      <>
        <p className="text-center">
          Wystąpił błąd, spróbuj odświeżyć stronę.
        </p>
      </>
    )
  }

  const renderSpinner = () => {
    return (
      <div role="status" className="flex justify-center p-5">
        <svg aria-hidden="true" className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    )
  }

  if (redirect) {
    return <Navigate to='/admin/edit-article' />;
  }

  return (
    <>
      <main className="flex flex-1 pl-72">
        <article className="p-5 flex-1 flex flex-col w-full">
          <h1 className="text-3xl font-bold mb-2">
            Edycja artykułu
          </h1>
          <form
            className="flex flex-col gap-2"
            onSubmit={sendEditArticle}>
            {article && article.content ? article.content.map((item, key) => {
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
                  image={item.image}
                  alt={item.alt}
                />
              )
            }) :
              (!statusError ? renderSpinner() :
                <div className="text-center flex-1">
                  <span className="block font-bold text-3xl mb-10">Błąd 404</span>
                  <p className="text-xl">taki artykuł nie istnieje.</p>
                </div>)
            }
            {!statusError ? <input
              type="submit"
              value="potwierdzić"
              className="mx-auto block mt-5 py-3 px-6 border rounded-lg cursor-pointer hover:bg-slate-100 transition active:bg-slate-200"
            /> : null}

          </form>
        </article>
      </main >
      <>
        {modalActive.open ?
          <Modal>
            {!modalActive.error ? renderModal() : renderModalError()}
          </Modal> :
          null
        }
      </>
    </>
  );
};

export default EditingArticle;