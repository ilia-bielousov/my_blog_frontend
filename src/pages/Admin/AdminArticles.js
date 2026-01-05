import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchForAllCards } from '../../store/asyncAction/cardsAdmin';
import { fetchForAllArticle } from '../../store/asyncAction/articlesAdmin';
import PageHeader from '../../components/PageHeader';

const categories = [
  { name: 'Программирование', block: 'programming', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Пет-проекты', block: 'projects', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: '3D Моделирование', block: 'modeling', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
];

const AdminArticles = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);
  const allArticles = useSelector(state => state.admin.raportsArticles.articles);
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(fetchForAllCards());
    dispatch(fetchForAllArticle());
  }, [dispatch]);

  if (!token) {
    alert('У вас нет доступа к просмотру статистики.')
    return <Navigate to='/' />
  }

  // Хелпер для получения просмотров без грязи в JSX
  const getViews = (cardId) => {
    const article = allArticles.find(art => art.card === cardId);
    return article ? article.views : 0;
  };

  const renderCategoryStats = (category) => {
    // Фильтруем карточки этой категории
    const categoryCards = allCards.filter(card => card.choose === category.block);

    if (categoryCards.length === 0) return null;

    return (
      <section key={category.block} className="mb-12 last:mb-0">
        {/* Заголовок категории */}
        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
          <span className={`p-2 rounded-lg ${category.bg} ${category.color}`}>
            {/* Иконка графика */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
          </span>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            {category.name}
          </h3>
        </div>

        {/* Сетка карточек статистики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((card) => {
            const views = getViews(card._id);
            return (
              <div
                key={card._id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                    {card.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Блок с просмотрами */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                  <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    Просмотры
                  </span>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-2xl font-mono font-bold">
                      {views}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <PageHeader
        title="Аналитика контента"
        description="Статистика просмотров ваших публикаций по категориям."
      />

      <div className="pb-10">
        {categories.map((cat) => renderCategoryStats(cat))}
      </div>
    </div>
  );
};

export default AdminArticles;