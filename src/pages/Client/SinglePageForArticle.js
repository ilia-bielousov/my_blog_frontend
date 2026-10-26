import { useEffect, useMemo } from "react";
import { useLocation, useParams, useNavigate, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import Modal from "../../components/Modal";
import SkeletonArticle from "../../components/SkeletonArticle";

import { removeStateArticle, updateStatusError } from "../../store/clientReducer";
import { fetchArticle } from "../../store/asyncAction/article";
import { fetchCards } from "../../store/asyncAction/cardsClient";

import { createArticle, getImageUrl } from "../../utilities/utilities.js";

const SidebarArticleCard = ({ article }) => {
  const imageSrc = getImageUrl(article.image);
  return (
    <Link
      to={`/${article.choose}/${article.pseudoName}`}
      state={{ title: article.name }}
      className="group flex gap-3 items-start p-3 rounded-lg mouse:bg-slate-50 dark:mouse:bg-slate-800 transition-colors border border-transparent mouse:border-slate-200 dark:mouse:border-slate-700"
    >
      <div className="shrink-0 w-20 h-16 rounded-md overflow-hidden bg-slate-200">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-mouse:scale-110"
          src={imageSrc}
          alt={article.name}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col min-w-0">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2 mb-1 group-mouse:text-blue-600 transition-colors">
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
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cards = useSelector(state => state.client.cards);
  const article = useSelector(state => state.client.article);
  const error = useSelector(state => state.client.error);
  const code = useSelector(state => state.client.code);

  const currentSection = pathname.split('/')[1];

  const titleFromCard = state?.title;

  const articleId = article?._id;

  const randomArticles = useMemo(() => {
    if (!cards || !Array.isArray(cards) || cards.length === 0) return [];

    const pool = cards.filter(c =>
      c.pseudoName !== id &&
      c._id !== articleId &&
      c.choose === currentSection &&
      c.pseudoName !== currentSection
    );

    if (pool.length === 0) return [];

    return [...pool].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [cards, id, articleId, currentSection]);

  useEffect(() => {
    if (!id) return;
    window.scrollTo(0, 0);

    dispatch(removeStateArticle());
    dispatch(updateStatusError());
    dispatch(fetchArticle(id, currentSection));

    axios.patch(`${process.env.REACT_APP_API_URL}${pathname.slice(1)}`, { id })
      .catch(err => console.error(err));

  }, [id, currentSection, pathname, dispatch]);

  useEffect(() => {
    const hasSectionCards = Array.isArray(cards) && cards.some(c => c.choose === currentSection);
    if (!hasSectionCards && currentSection) {
      dispatch(fetchCards(currentSection));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, dispatch]);

  useEffect(() => {
    if (titleFromCard) {
      document.title = titleFromCard;
    }
    else if (article && article.name) {
      document.title = article.name;
    } else {
      document.title = 'Мой блог';
    }
  }, [titleFromCard, article]);

  const isArticleLoading = !article && !error;
  const isSidebarLoading = (!cards || cards.length === 0) && !error;

  return (
    <>
      <main className="w-full max-w-[1400px] mx-auto min-h-[80vh] py-4 md:py-8 px-4 md:pl-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <article className="w-full lg:w-[70%] bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 md:p-12 animate-fadeIn">

            {isArticleLoading ? (
              <SkeletonArticle />
            ) : article ? (
              <>
                <nav className="mb-6">
                  <button
                    onClick={() => navigate(`/${currentSection}`)}
                    className="flex items-center gap-2 text-sm text-slate-500 mouse:text-blue-600 transition-colors font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Назад к списку
                  </button>
                </nav>
                <div className="prose prose-slate md:prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-bold break-words prose-a:text-blue-600 mouse:prose-a:text-blue-500">
                  {createArticle(article.content)}
                </div>
              </>
            ) : null}
          </article>

          <aside className="w-full lg:w-[30%] space-y-6 md:space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-slate-100 dark:border-slate-700 shadow-sm sticky top-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Интересное в разделе
              </h3>

              <div className="flex flex-col gap-2">
                {isSidebarLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
                    <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
                    <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
                  </div>
                ) : randomArticles.length > 0 ? (
                  randomArticles.map(item => (
                    <SidebarArticleCard key={item._id || item.pseudoName} article={item} />
                  ))
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-500 py-2">
                    Других статей в этом разделе пока нет
                  </p>
                )}
              </div>
            </div>
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
              <button onClick={() => navigate(`/${currentSection}`)} className="w-full py-2 bg-blue-600 text-white rounded-lg mouse:bg-blue-700">Вернуться в раздел</button>
            </div>
          </Modal>
        )
      )}
    </>
  )
}

export default SinglePageForArticle;