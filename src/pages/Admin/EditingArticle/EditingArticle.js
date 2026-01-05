import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import axios from 'axios';

import { fetchArticle } from "../../../store/asyncAction/article";
import { removeStateArticle, updateStatusError } from "../../../store/clientReducer";

import Modal from "../../../components/Modal";
import PanelTags from "../CreatingArticle/elements/PanelTags";
import AreaNewTagsForEdit from "./elements/AreaNewTagsForEdit";
import PageHeader from "../../../components/PageHeader";

const EditingArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [modalActive, setModalActive] = useState({ status: null, error: false, loading: false });
  const [redirect, setRedirect] = useState(false);

  const article = useSelector(state => state.client.article);
  const statusError = useSelector(state => state.client.error);

  useEffect(() => {
    dispatch(removeStateArticle());
    dispatch(updateStatusError())
    dispatch(fetchArticle(id, 'admin/edit-article'));
  }, [dispatch, id]);

  const sendEditArticle = async (e) => {
    e?.preventDefault(); // e может быть undefined, если вызываем не из формы

    // Включаем спиннер (если нужно)
    // setModalActive({ open: true, loading: true });

    try {
      const res = await axios.patch(`${process.env.REACT_APP_API_URL}admin/edit-article`, article);
      if (res.data.status === 200) {
        setModalActive({ open: true, error: false, loading: false });
      }
    } catch (err) {
      if (err.response?.data?.status === 500) {
        setModalActive({ open: true, error: true, loading: false });
      }
    }
  }

  // --- Модалки (Успех/Ошибка/Спиннер) ---
  const renderModal = () => (
    <div className="p-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Изменения сохранены!</h3>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Статья успешно обновлена.</p>
      <button
        onClick={() => setRedirect(true)}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
      >
        Вернуться к списку
      </button>
    </div>
  );

  const renderModalError = () => (
    <div className="p-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ошибка</h3>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Не удалось сохранить изменения.</p>
      <button
        onClick={() => setModalActive({ open: false })}
        className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium"
      >
        Закрыть
      </button>
    </div>
  );

  const renderSpinner = () => (
    <div className="flex justify-center p-20">
      <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  if (redirect) {
    return <Navigate to='/admin/edit-article' />;
  }

  // Если статья еще не загрузилась
  if (!article || (!article.content && !statusError)) {
    return (
      <div className="w-full max-w-[1600px] mx-auto">
        <PageHeader title="Загрузка..." />
        {renderSpinner()}
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      {/* 1. Заголовок */}
      <PageHeader
        title="Режим редактирования"
        description={`Вы работаете над статьей: "${article.name || 'Без названия'}"`}
      >
        {/* Дополнительная кнопка сохранения в хедере */}
        <button
          onClick={sendEditArticle}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold shadow-sm"
        >
          Сохранить изменения
        </button>
      </PageHeader>

      {/* 2. Основная рабочая область (Grid Layout как в CreateArticle) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start relative h-[calc(100vh-200px)]">

        {/* Левая часть: Редактор */}
        <div className="flex-1 w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">

            {/* Рендер контента */}
            <form onSubmit={sendEditArticle} className="min-h-full">
              {article && article.content ? <AreaNewTagsForEdit article={article} /> : null}

              {/* Скрытая кнопка для submit по Enter (опционально) */}
              <input type="submit" className="hidden" />
            </form>

            {/* Ошибка загрузки */}
            {statusError && (
              <div className="text-center text-red-500 py-10">Ошибка загрузки данных статьи.</div>
            )}
          </div>
        </div>

        {/* Правая часть: Панель тегов (Sticky) */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-4">
            {/* Передаем функцию сохранения в панель, если там есть кнопка "Опубликовать/Сохранить" */}
            <PanelTags
              setModalActive={setModalActive}
              // Можно прокинуть метод сохранения, если PanelTags умеет его вызывать
              onSave={sendEditArticle}
            />
          </div>
        </aside>

      </div>

      {/* 3. Модалка */}
      {modalActive.open && (
        <Modal>
          {!modalActive.error ? renderModal() : renderModalError()}
        </Modal>
      )}
    </div>
  );
};

export default EditingArticle;