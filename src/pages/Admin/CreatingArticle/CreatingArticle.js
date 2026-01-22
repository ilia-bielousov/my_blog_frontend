import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Админские экшены
import {
  statusCreatingCard,
  resetComponentToArticle,
  resetPreviewContentAnArticle,
  updateReviewContentAnArticle // Нужно для обновления стилей перед отправкой
} from "../../../store/adminActions";

import PageHeader from "../../../components/PageHeader";
import AreaNewTags from "./elements/AreaNewTags";
import PanelTags from "./elements/PanelTags";
import Modal from "../../../components/Modal";

const CreatingArticle = () => {
  const dispatch = useDispatch();

  // Данные из Redux
  const idArticle = useSelector(state => state.admin.id); // ID Карточки, созданной на прошлом шаге
  const adminContent = useSelector(state => state.admin.creatingArticle.previewElements); // Контент статьи

  const [, setRedirect] = useState(false);
  const [modalActive, setModalActive] = useState({ open: false, error: false, loading: false });
  const [idPreview, setIdPreview] = useState(null); // ID для превью

  useEffect(() => {
    // Если нет ID карточки (пользователь обновил страницу), нужно уходить
    if (idArticle) {
      dispatch(statusCreatingCard(false));
      dispatch(resetComponentToArticle());
      dispatch(resetPreviewContentAnArticle());
    } else {
      setRedirect(true);
    }
  }, [dispatch, idArticle]);

  if (!localStorage.getItem('admin')) {
    alert('У вас нет доступа.')
    return <Navigate to='/' />
  }

  // Если потеряли ID карточки - редирект на создание карточки
  if (!idArticle && !localStorage.getItem('admin')) { // Упрощенная проверка для редиректа
    return <Navigate to='/admin/create-card' />
  }


  // --- ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ: Обновление классов (стилей) перед отправкой ---
  // (Та же логика, что была в PanelTags, теперь здесь или можно вынести в util)
  const updateClassName = () => {
    const updatedContent = adminContent.map(item => {
      const newItem = { ...item };
      switch (newItem.tag) {
        case 'h1': newItem.className = 'text-3xl font-bold mb-5 max-md:text-2xl text-slate-900 dark:text-white'; break;
        case 'h2': newItem.className = 'text-2xl font-bold mb-4 max-md:text-xl text-slate-800 dark:text-slate-100'; break;
        case 'h3': newItem.className = 'text-xl mb-3 max-md:text-lg text-slate-800 dark:text-slate-200'; break;
        case 'p': newItem.className = 'text-justify indent-12 mb-3 text-slate-600 dark:text-slate-300'; break;
        case 'img': newItem.className = 'mx-auto p-3 rounded-lg'; break;
        default: break;
      }
      return newItem;
    });
    // Обновляем Redux, чтобы отправить красивые классы
    dispatch(updateReviewContentAnArticle(updatedContent));
    return updatedContent; // Возвращаем для немедленного использования
  }


  // --- ЛОГИКА: ПРЕДПРОСМОТР ---
  const handlePreview = async () => {
    const contentToSend = updateClassName();

    try {
      if (idPreview) {
        await axios.patch(`${process.env.REACT_APP_API_URL}admin/preview`, { _id: idPreview, content: contentToSend });
      } else {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}admin/preview`, contentToSend);
        setIdPreview(res.data.id || res.data); // Зависит от того, что возвращает бэк (ID)
      }
      // Можно добавить уведомление "Превью обновлено"
      alert("Превью обновлено!");
    } catch (e) {
      console.error(e);
      alert("Ошибка превью");
    }
  }


  // --- ЛОГИКА: СОЗДАНИЕ СТАТЬИ (ПУБЛИКАЦИЯ) ---
  const sendArticle = async () => {
    setModalActive({ open: true, loading: true, error: false });
    const contentToSend = updateClassName();

    // Если было превью - удаляем его перед публикацией, чтобы не мусорить в БД
    if (idPreview) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}admin/preview/${idPreview}`);
      } catch (e) { console.error(e); }
    }

    try {
      // ВАЖНО: Используем новый формат, который мы утвердили для контроллера
      const res = await axios.post(`${process.env.REACT_APP_API_URL}admin/create-article`, {
        cardId: idArticle,       // ID карточки
        content: contentToSend,  // Массив блоков
        isPublished: true        // Сразу публикуем (или false, если хочешь черновик)
      });

      if (res.data.status === 200) {
        setModalActive({ open: true, loading: false, error: false });
      } else {
        throw new Error("Status not 200");
      }
    } catch (err) {
      console.error(err);
      setModalActive({ open: true, loading: false, error: true });
    }
  }


  // --- Рендер модалок (как у тебя было) ---
  const renderModal = () => (
    <div className="p-6 flex flex-col items-center">
      {/* ... (твой код успеха без изменений) ... */}
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Успешно!</h3>
      <Link to="/admin" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-sm">
        В админку
      </Link>
    </div>
  );

  const renderModalError = () => (
    <div className="p-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ошибка</h3>
      <p className="mb-4 text-center text-slate-500">Не удалось создать статью.</p>
      <button onClick={() => setModalActive({ open: false })} className="px-6 py-2 bg-slate-200 rounded-lg">Закрыть</button>
    </div>
  );

  const renderSpinner = () => (
    <div className="flex justify-center items-center py-8">
      <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    </div>
  );


  return (
    <div className="w-full max-w-[1600px] mx-auto">
      {/* 1. Заголовок + КНОПКИ ДЕЙСТВИЯ */}
      <PageHeader
        title="Создание статьи"
        description="Конструктор контента: наполните статью содержанием."
      >
        {/* ВОТ ОНИ, РОДИМЫЕ! */}
        <div className="flex gap-3">
          <button
            onClick={handlePreview}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg font-bold text-sm transition-colors"
          >
            Предпросмотр
          </button>
          <button
            onClick={sendArticle}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-sm flex items-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            Опубликовать
          </button>
        </div>
      </PageHeader>

      {/* 2. Рабочая область */}
      <div className="flex flex-col lg:flex-row gap-8 items-start relative h-[calc(100vh-200px)]">
        <div className="flex-1 w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900/50">
            <AreaNewTags />
          </div>
        </div>

        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-4">
            {/* Панель теперь просто инструменты, без кнопок */}
            <PanelTags setModalActive={setModalActive} />
          </div>
        </aside>
      </div>

      {/* 3. Модалка */}
      {modalActive.open && (
        <Modal>
          {modalActive.loading ? renderSpinner() : (modalActive.error ? renderModalError() : renderModal())}
        </Modal>
      )}
    </div>
  );
};

export default CreatingArticle;