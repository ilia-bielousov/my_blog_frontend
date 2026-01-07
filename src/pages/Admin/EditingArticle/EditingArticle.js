import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import axios from 'axios';

// Импортируем админские экшены
import {
  setContent,
  resetComponentToArticle,
  resetPreviewContentAnArticle
} from "../../../store/adminActions";

import Modal from "../../../components/Modal";
import PanelTags from "../CreatingArticle/elements/PanelTags";
import PageHeader from "../../../components/PageHeader";
import AreaNewTagsForEdit from "./elements/AreaNewTagsForEdit";

const EditingArticle = () => {
  const { id } = useParams(); // pseudoName или ID
  const dispatch = useDispatch();

  const [modalActive, setModalActive] = useState({ open: false, error: false, loading: true });
  const [redirect, setRedirect] = useState(false);

  // Данные из Redux (контент редактора)
  const adminContent = useSelector(state => state.admin.creatingArticle.previewElements);

  // Данные о статье (ID и Имя)
  const [articleMeta, setArticleMeta] = useState({ name: '', _id: null });

  // 1. ЗАГРУЗКА
  useEffect(() => {
    const fetchData = async () => {
      // Чистим редактор перед загрузкой
      dispatch(resetComponentToArticle());
      dispatch(resetPreviewContentAnArticle());

      setModalActive({ open: false, error: false, loading: true });

      try {
        // Запрос к нашему новому контроллеру getArticleForEdit
        const res = await axios.get(`${process.env.REACT_APP_API_URL}admin/edit-article/${id}`);

        if (res.data) {
          // Загружаем контент в Redux
          if (res.data.content) {
            dispatch(setContent(res.data.content));
          }
          // Сохраняем ID и Имя
          setArticleMeta({
            name: res.data.name,
            _id: res.data._id
          });
        }
        setModalActive({ open: false, error: false, loading: false });

      } catch (err) {
        console.error(err);
        setModalActive({ open: true, error: true, loading: false });
      }
    };

    fetchData();
  }, [dispatch, id]);

  // 2. СОХРАНЕНИЕ
  const sendEditArticle = async (e) => {
    e?.preventDefault();
    setModalActive({ open: true, loading: true, error: false });

    try {
      // Отправляем объект { id, content }
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}admin/edit-article`, {
        id: articleMeta._id,
        content: adminContent
      });

      if (res.data.status === 200) {
        setModalActive({ open: true, error: false, loading: false });
      }
    } catch (err) {
      console.error(err);
      setModalActive({ open: true, error: true, loading: false });
    }
  }

  // --- UI ---
  const renderSpinner = () => (
    <div className="flex justify-center items-center py-20">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    </div>
  );

  const renderModalSuccess = () => (
    <div className="p-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></div>
      <h3 className="text-xl font-bold mb-2">Сохранено!</h3>
      <button onClick={() => setRedirect(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg">К списку</button>
    </div>
  );

  const renderModalError = () => (
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold text-red-600 mb-2">Ошибка</h3>
      <button onClick={() => setModalActive({ open: false })} className="px-6 py-2 bg-slate-200 rounded-lg">Закрыть</button>
    </div>
  );

  if (redirect) return <Navigate to='/admin/edit-cards' />; // Или куда тебе надо

  // Главный рендер
  if (modalActive.loading && !articleMeta._id) {
    return <div className="w-full max-w-[1600px] mx-auto"><PageHeader title="Загрузка..." />{renderSpinner()}</div>;
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <PageHeader
        title="Редактирование"
        description={`Статья: "${articleMeta.name}"`}
      >
        <button onClick={sendEditArticle} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold">
          Сохранить
        </button>
      </PageHeader>

      <div className="flex flex-col lg:flex-row gap-8 items-start h-[calc(100vh-200px)]">
        <div className="flex-1 w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
            <AreaNewTagsForEdit article={adminContent} />
          </div>
        </div>

        <aside className="w-full lg:w-80 shrink-0 sticky top-4">
          <PanelTags setModalActive={setModalActive} onSave={sendEditArticle} />
        </aside>
      </div>

      {modalActive.open && (
        <Modal>
          {/* Если сохраняем (есть ID и loading) - показываем спиннер, иначе успех/ошибка */}
          {modalActive.loading && articleMeta._id ?
            <div className="p-10">{renderSpinner()}</div> :
            (!modalActive.error ? renderModalSuccess() : renderModalError())
          }
        </Modal>
      )}
    </div>
  );
};

export default EditingArticle;