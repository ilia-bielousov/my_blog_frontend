import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

import Content from "../../components/Content";
import Modal from "../../components/Modal";
import SkeletonCards from "../../components/SkeletonCards";

import { fetchCards } from "../../store/asyncAction/cardsClient";
import { updateStatusError, removeStateCards, removeStateArticle } from "../../store/clientReducer";

const PageForCards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cards = useSelector(state => state.client.cards);
  const error = useSelector(state => state.client.error);
  const code = useSelector(state => state.client.code);
  const { pathname } = useLocation();

  const path = pathname.replace(/\//g, '');

  // 1. Логика запросов
  useEffect(() => {
    dispatch(removeStateArticle());
    dispatch(updateStatusError());
    dispatch(fetchCards(path));
    dispatch(removeStateCards());

  }, [dispatch, path]);

  // === ГЛАВНОЕ УСЛОВИЕ ===
  const isLoading = (!cards || cards.length === 0) && !error;
  const isError500 = error && code === 500;

  // 3. ЕДИНЫЙ RENDER
  return (
    <>
      <main className="w-full max-w-[1400px] mx-auto min-h-[80vh] py-8 px-4 flex justify-center items-center">

        {/* ИСПРАВЛЕНИЕ ЗДЕСЬ:
           Мы перенесли классы flex, justify-center и gap-8 в этот общий div.
           Теперь неважно, что внутри (скелетоны или контент) — оно всегда будет по центру.
        */}
        <div className="w-full flex flex-wrap justify-center gap-8">

          {isLoading ? (
            // ВАРИАНТ 1: ЗАГРУЗКА
            // SkeletonCards возвращает фрагмент, поэтому классы родителя (flex...) применятся к ним
            <SkeletonCards />
          ) : (
            // ВАРИАНТ 2: КОНТЕНТ
            // Content тоже должен возвращать список/фрагмент, и они встанут по центру
            <Content data={cards} />
          )}

        </div>
      </main>

      {/* МОДАЛКА ОШИБКИ (Рендерится поверх, если есть ошибка) */}
      {isError500 && (
        <Modal>
          <div className="p-4 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-red-100 dark:bg-red-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-red-600 dark:text-red-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Что-то пошло не так</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Не удалось загрузить данные.</p>
            <div className="flex flex-col gap-3 w-full">
              <button onClick={() => window.location.reload()} className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors">Обновить страницу</button>
              <button onClick={() => path === '' ? window.location.reload() : navigate(-1)} className="w-full rounded-lg bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">Вернуться назад</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default PageForCards;