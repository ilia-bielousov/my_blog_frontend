import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { statusCreatingCard, resetComponentToArticle, resetPreviewContentAnArticle } from "../../../store/adminActions";

import AreaNewTags from "./elements/AreaNewTags"
import PanelTags from "./elements/PanelTags";
import Modal from "../../../components/Modal";

const CreatingArticle = () => {
  const dispatch = useDispatch();
  const [, setRedirect] = useState(false); // ?? это еще зачем не помню.
  const [modalActive, setModalActive] = useState({ status: null, error: false, loading: false });
  const idArticle = useSelector(state => state.admin.id);

  useEffect(() => {
    if (idArticle) {
      dispatch(statusCreatingCard(false));
      dispatch(resetComponentToArticle());
      dispatch(resetPreviewContentAnArticle());
    } else {
      setRedirect(true);
    }
    // нужно проверить, если обновили страницу и нет айди в редаксе, найти карточку и удалить ее в монго
  }, []);

  // для перезагрузки
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, []);

  if (!localStorage.getItem('admin')) {
    alert('У вас нет доступа, чтобы создавать/редактировать статьи.')
    return <Navigate to='/' />
  }

  const renderModal = () => {
    return (
      <>
        {modalActive.loading ?
          <div className="flex h-full justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
          </div>
          :
          <>
            <p className="text-center">
              Статья была успешно создана.
            </p>
            <p className="text-center">
              Нажмите кнопку, чтобы продолжить.
            </p>
            <div className="flex justify-center">
              <Link
                to="/admin"
                key={'admin'}
                type="submit"
                className="p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
                onClick={() => {
                  setModalActive({ open: false, error: false })
                }
                }
              >
                продолжить
              </Link>
            </div>
          </>
        }
      </>
    )
  }

  const renderModalError = () => {
    return (
      <>
        {
          modalActive.loading ?
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
            :
            <>
              <p className="text-center">
                Что-то пошло не так... попробуйте еще раз.
              </p>
              <div className="flex justify-center">
                <Link
                  to="../create-card"
                  relative="admin"
                  key={'create-card'}
                  type="submit"
                  className="p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
                  onClick={() => {
                    // здесь нужно делать запрос и удалять карточку, что создали ранее
                    setModalActive({ open: false, error: false })
                  }
                  }
                >
                  Tutaj
                </Link>
              </div>
            </>
        }
      </>
    )
  }

  return (
    <>
      <main className="flex flex-1 pl-72">
        <aside className="w-2/3 flex flex-col flex-1 px-3 pt-3">
          <h2 className="text-3xl font-bold mb-5 text-center">
            Создание статьи
          </h2>
          <AreaNewTags />
        </aside>
      </main>
      <PanelTags
        setModalActive={setModalActive}
      />
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

export default CreatingArticle;