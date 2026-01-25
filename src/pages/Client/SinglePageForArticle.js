import { useEffect, useMemo } from "react";
import { useLocation, useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import Modal from "../../components/Modal";
import { removeStateArticle, removeStateCards, updateStatusError } from "../../store/clientReducer";
import { fetchArticle } from "../../store/asyncAction/article";
import { fetchCards } from "../../store/asyncAction/cardsClient";

import { createArticle, getImageUrl } from "../../utilities/utilities.js";

const SidebarArticleCard = ({ article }) => {
  const imageSrc = getImageUrl(article.image);

  return (
    <Link
      to={`../${article.choose}/${article.pseudoName}`}
      className="group flex gap-3 items-start p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
    >
      <div className="shrink-0 w-20 h-16 rounded-md overflow-hidden bg-slate-200">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={imageSrc}
          alt={article.name}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
          {article.name}
        </h4>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span>Читать далее →</span>
        </div>
      </div>
    </Link>
  );
};

const SinglePageForArticle = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cards = useSelector(state => state.client.cards);
  const article = useSelector(state => state.client.article);
  const error = useSelector(state => state.client.error);
  const code = useSelector(state => state.client.code);

  const currentSection = pathname.split('/')[1];

  const randomArticles = useMemo(() => {
    if (!cards || !Array.isArray(cards)) return [];
    const pool = cards.filter(c =>
      c.pseudoName !== id && c._id !== article?._id &&
      c.choose === currentSection &&
      c.pseudoName !== currentSection
    );
    if (pool.length === 0) return [];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [cards, id, article, currentSection]);

  useEffect(() => {
    if (!id) return;

    window.scrollTo(0, 0);

    dispatch(removeStateCards());
    dispatch(removeStateArticle());
    dispatch(updateStatusError());

    dispatch(fetchCards(currentSection));
    dispatch(fetchArticle(id, currentSection));

    axios.patch(`${process.env.REACT_APP_API_URL}${pathname.slice(1)}`, { id })
      .catch(err => console.error(err));

  }, [id, currentSection, dispatch]);

  useEffect(() => {
    if (article && article.name) {
      document.title = `${article.name} | Мой Блог`;
    } else {
      document.title = 'Загрузка... | Мой Блог';
    }

    // Cleanup: при уходе со страницы возвращаем общий тайтл
    return () => {
      document.title = 'Мой Блог';
    }
  }, [article]);

  const renderSpinner = () => (
    <div className="flex justify-center py-20 min-h-[50vh]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-slate-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-600 border-t-transparent shadow-md"></div>
      </div>
    </div>
  );

  return (
    <>
      {/* ИСПРАВЛЕНИЕ ЗДЕСЬ:
         Было: className="w-full max-w-[1400px] mx-auto min-h-[80vh] py-8 px-4"
         Стало: добавил md:pl-24. 
         Это сдвигает контент вправо на 6rem (96px), освобождая место для стрелки (которая шириной 80px),
         но только на экранах md и выше.
      */}
      <main className="w-full max-w-[1400px] mx-auto min-h-[80vh] py-8 px-4 md:pl-24">

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          <article className="w-full lg:w-[70%] bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-12 animate-fadeIn">
            {article ? (
              <>
                <nav className="mb-6">
                  <button
                    onClick={() => navigate(`/${currentSection}`)}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Назад к списку
                  </button>
                </nav>

                <header className="mb-8 border-b border-slate-100 dark:border-slate-700 pb-8">
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                    {currentSection}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 break-words">
                    {article.name}
                  </h1>
                  <p className="text-lg text-slate-500 dark:text-slate-400">
                    {article.description}
                  </p>
                </header>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-bold break-words">
                  {createArticle(article.content)}
                </div>
              </>
            ) : (
              !error && renderSpinner()
            )}
          </article>

          <aside className="w-full lg:w-[30%] space-y-8">
            {randomArticles.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm sticky top-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                  Интересное в разделе
                </h3>

                <div className="flex flex-col gap-2">
                  {randomArticles.map(item => (
                    <SidebarArticleCard key={item._id || item.pseudoName} article={item} />
                  ))}
                </div>
              </div>
            )}
          </aside>

        </div>
      </main>

      {error && (
        code === 404 ? (
          <Navigate to={`../${currentSection}/error404`} replace={true} />
        ) : (
          <Modal>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Ошибка загрузки</h3>
              <p className="text-slate-500 mb-6">Не удалось открыть статью.</p>
              <button onClick={() => navigate(`/${currentSection}`)} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Вернуться в раздел</button>
            </div>
          </Modal>
        )
      )}
    </>
  )
}

export default SinglePageForArticle;