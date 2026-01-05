import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { fetchForAllCards } from '../../store/asyncAction/cardsAdmin'; // Используем тот же экшен получения всех карт
import PageHeader from "../../components/PageHeader";

const AdminDrafts = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(fetchForAllCards());
  }, [dispatch]);

  if (!token) return <Navigate to='/' />;

  // Фильтруем: берем ТОЛЬКО те, где isPublished === false (или нет такого поля)
  // Примечание: тебе нужно будет адаптировать условие под то, как ты назовешь поле в БД
  // Пока предположим, что черновики - это те, у которых нет контента или спец. флаг
  const drafts = allCards.filter(card => !card.isPublished);

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <PageHeader
        title="Черновики"
        description="Неопубликованные материалы. Нажмите, чтобы продолжить работу."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {drafts.length > 0 ? drafts.map(card => (
          <Link
            key={card._id}
            to={`/admin/edit-article/${card.pseudoName}`} // Ведем на страницу редактирования
            className="group block p-6 bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded uppercase">
                Draft
              </span>
              <span className="text-slate-400 text-sm">{card.choose}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
              {card.name}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 line-clamp-2">
              {card.description}
            </p>
            <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1">
              Продолжить редактирование &rarr;
            </div>
          </Link>
        )) : (
          <div className="col-span-full text-center py-20 text-slate-500">
            Нет незавершенных черновиков.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDrafts;