import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { statusCreatingCard, resetComponentToArticle, resetPreviewContentAnArticle } from "../../../store/adminActions";

// Импортируем наш новый заголовок
import PageHeader from "../../../components/PageHeader";

import AreaNewTags from "./elements/AreaNewTags";
import PanelTags from "./elements/PanelTags";
import Modal from "../../../components/Modal";

const CreatingArticle = () => {
  const dispatch = useDispatch();
  const [, setRedirect] = useState(false);
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
  }, [dispatch, idArticle]); // Добавил зависимости для линтера, логика не меняется

  if (!localStorage.getItem('admin')) {
    alert('У вас нет доступа, чтобы создавать/редактировать статьи.')
    return <Navigate to='/' />
  }

  // --- Рендер контента модалки (Успех) ---
  const renderModal = () => {
    return (
      <div className="p-6 flex flex-col items-center">
        {modalActive.loading ? (
          <div className="flex justify-center items-center py-8">
            {/* Спиннер в стиле Tailwind */}
            <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Успешно!</h3>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
              Статья была успешно создана.
            </p>

            <Link
              to="/admin"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              onClick={() => setModalActive({ open: false, error: false })}
            >
              Продолжить
            </Link>
          </>
        )}
      </div>
    )
  }

  // --- Рендер контента модалки (Ошибка) ---
  const renderModalError = () => {
    return (
      <div className="p-6 flex flex-col items-center">
        {modalActive.loading ? (
          <div className="flex justify-center items-center py-8">
            <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ошибка</h3>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
              Что-то пошло не так... попробуйте еще раз.
            </p>

            <Link
              to="../create-card"
              relative="admin"
              className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
              onClick={() => {
                // здесь нужно делать запрос и удалять карточку, что создали ранее (логика сохранена)
                setModalActive({ open: false, error: false })
              }}
            >
              Попробовать снова
            </Link>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      {/* 1. Заголовок страницы */}
      <PageHeader
        title="Создание статьи"
        description="Конструктор контента: перетаскивайте элементы из правой панели в рабочую область."
      />

      {/* 2. Основная рабочая область (Grid Layout) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start relative h-[calc(100vh-200px)]">

        {/* Левая часть: Редактор */}
        {/* AreaNewTags растягивается (flex-1) */}
        <div className="flex-1 w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
            <AreaNewTags />
          </div>
        </div>

        {/* Правая часть: Панель тегов */}
        {/* PanelTags теперь живет внутри потока, но может быть "sticky" */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-4">
            <PanelTags setModalActive={setModalActive} />
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

export default CreatingArticle;