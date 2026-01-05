import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from 'react-router-dom';

import { fetchForAllCards } from '../../store/asyncAction/cardsAdmin';
import PageHeader from "../../components/PageHeader";

// Конфигурация категорий для красивого отображения
const CATEGORIES = [
  { id: 'programming', title: 'Программирование', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'projects', title: 'Пет-проекты', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'modeling', title: '3D Моделирование', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' },
];

const AdminEdit = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(fetchForAllCards());
  }, [dispatch]);

  if (!token) {
    alert('У вас нет доступа, чтобы создавать/редактировать статьи.')
    return <Navigate to='/' />
  }

  // Функция рендера одной секции (Категории)
  const renderCategorySection = (category) => {
    // Фильтруем карточки только этой категории
    const categoryCards = allCards.filter(card => card.choose === category.id);

    if (categoryCards.length === 0) return null; // Не рисуем пустые секции (или можно рисовать заглушку)

    return (
      <section key={category.id} className="mb-10 last:mb-0">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {category.title}
          </h2>
          <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${category.color}`}>
            {categoryCards.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categoryCards.map((card) => (
            <Link
              to={`/admin/edit-article/${card.pseudoName}`}
              key={card._id || card.pseudoName} // Лучше использовать _id если есть, или pseudoName
              className="
                        group relative flex flex-col p-5 h-full
                        bg-white dark:bg-slate-800 
                        border border-slate-200 dark:border-slate-700 
                        rounded-xl hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500
                        transition-all duration-200
                    "
            >
              {/* Верхняя часть: Иконка и Меню */}
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  {/* Иконка папки/документа */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>

                {/* Иконка редактирования (появляется при наведении или всегда видна) */}
                <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
              </div>

              {/* Контент */}
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {card.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
                {card.description}
              </p>

              {/* Футер карточки (например, дата или статус) */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 mt-auto">
                <span className="text-xs font-medium text-slate-400 uppercase">Редактировать</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <PageHeader
        title="Редактирование"
        description="Выберите статью из списка ниже, чтобы внести изменения."
      />

      <div className="pb-10">
        {allCards.length > 0 ? (
          <>
            {CATEGORIES.map(cat => renderCategorySection(cat))}

            {/* Если есть статьи без категории или с другой категорией, их можно вывести отдельно */}
          </>
        ) : (
          // Состояние загрузки или пустого списка
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p>Загрузка списка статей или список пуст...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEdit;