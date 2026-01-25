import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

import Content from "../../components/Content";
import Modal from "../../components/Modal";
import { fetchCards } from "../../store/asyncAction/cardsClient";

import { updateStatusError, removeStateCards, removeStateArticle } from "../../store/clientReducer";

const PageForCards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cards = useSelector(state => state.client.cards);
  const error = useSelector(state => state.client.error);
  const code = useSelector(state => state.client.code);
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(true);

  const path = pathname.replace(/\//g, '');

  useEffect(() => {
    dispatch(removeStateCards());
    dispatch(removeStateArticle());
    dispatch(updateStatusError());
    dispatch(fetchCards(path));
    setLoading(true);

    if (cards || error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const title = path === ''
      ? 'Главная'
      : path.charAt(0).toUpperCase() + path.slice(1);

    document.title = `${title} | Мой Блог`;

  }, [path]);

  return (
    <>
      {cards.length !== 0 && code !== 500 && !loading ?
        <Content
          data={cards}
        />
        :
        null
      }
      {error && !loading && code === 500 ?
        <>
          <main className="flex-1" />
          <Modal>
            <div className="p-4">
              {/* Иконка ошибки */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-red-600 dark:text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>

              {/* Текст */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Что-то пошло не так
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Не удалось загрузить данные (Код 500). <br /> Попробуйте обновить страницу.
                </p>
              </div>

              {/* Кнопки */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Обновить страницу
                </button>

                <button
                  onClick={() => path === '' ? window.location.reload() : navigate(-1)}
                  className="w-full justify-center rounded-lg bg-white dark:bg-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                >
                  Вернуться назад
                </button>
              </div>
            </div>
          </Modal>
        </>
        :
        null
      }
    </>
  )
}

export default PageForCards;