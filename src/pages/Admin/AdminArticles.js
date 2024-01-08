import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForAllCards } from '../../store/asyncAction/allCards';
import { fetchForAllArticle } from '../../store/asyncAction/allArticles';

const AdminArticles = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);
  const allArticles = useSelector(state => state.admin.raportsArticles.articles);

  useEffect(() => {
    dispatch(fetchForAllCards());
    dispatch(fetchForAllArticle());
  }, []); // как-то неправильно работает аналитика

  const renderRaports = (block) => {
    return allCards.map((card, key) => {
      if (block === card.choose) {
        const t = allArticles.map(article => {
          if (article.card === card._id) {
            return article.views;
          }
        });

        return (
          <li className='mb-1 text-xl' key={key}>
            <span className='font-semibold'>Название статьи:</span> <span>{card.name}, </span>
            <span className='font-semibold'>Описание статьи:</span> <span>{card.description}, </span>
            <span className='font-semibold'>количество просмотров:</span> <span>{t}.</span>
          </li>
        )
      }
    });
  }

  return (
    <main className="flex-1 pl-72">
      <article className="p-5">
        <h2 className='text-4xl mb-10'>
          Статистика
        </h2>
        <div className='articles p-3'>
          <div className="programming mb-3">
            <h3 className='text-3xl mb-2'>
              Программирование
            </h3>
            <ol className='list-decimal'>
              {renderRaports("programming")}
            </ol>
          </div>
          <div className="projects mb-3">
            <h3 className='text-3xl mb-2'>
              Ардуино
            </h3>
            <ol className='list-decimal'>
              {renderRaports("projects")}
            </ol>
          </div>
          <div className="modeling">
            <h3 className='text-3xl mb-2'>
              Моделирование
            </h3>
            <ol className='list-decimal'>
              {renderRaports("modeling")}
            </ol>
          </div>
        </div>
      </article>
    </main>
  );
};

export default AdminArticles;