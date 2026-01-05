import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from 'react-router-dom';

import { fetchForAllCards } from '../../store/asyncAction/cardsAdmin';
import PageHeader from "../../components/PageHeader";

const CATEGORIES = [
  { id: 'programming', title: 'Программирование', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'projects', title: 'Пет-проекты', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'modeling', title: '3D Моделирование', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
];

const AdminEditCards = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(fetchForAllCards());
  }, [dispatch]);

  if (!token) return <Navigate to='/' />;

  const renderCategorySection = (category) => {
    const categoryCards = allCards.filter(card => card.choose === category.id);
    if (categoryCards.length === 0) return null;

    return (
      <section key={category.id} className="mb-10 last:mb-0">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{category.title}</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${category.color}`}>
            {categoryCards.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categoryCards.map((card) => (
            <Link
              // ВАЖНО: Ведем на роут редактирования КАРТОЧКИ, а не статьи
              to={`/admin/edit-cards/${card.pseudoName}`}
              key={card._id}
              className="group relative flex flex-col p-5 h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  {/* Иконка "карточки" */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2">{card.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 flex-1">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <PageHeader
        title="Управление карточками"
        description="Редактирование названий, описаний и обложек для ленты блога."
      />
      <div className="pb-10">
        {allCards.length > 0 ? CATEGORIES.map(cat => renderCategorySection(cat)) : <div className="text-center py-20 text-slate-500">Загрузка...</div>}
      </div>
    </div>
  );
};

export default AdminEditCards;