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
          <li className='mb-1 text-xl flex flex-col p-2' key={key}>
            <div className='flex justify-between gap-5'>
              <span className='font-semibold flex-1'>Название статьи:</span> <span className='flex-1'>{card.name} </span>
            </div>
            <div className='flex justify-between gap-5'>
              <span className='font-semibold flex-1'>Описание статьи:</span> <span className='flex-1'>{card.description} </span>
            </div>
            <div className='flex justify-between gap-5'>
              <span className='font-semibold flex-1'>количество просмотров:</span> <span className='flex-1'>{t}.</span>
            </div>
          </li>
        )
      }
    });
  }

  return (
    <main className="flex-1 pl-72">
      <article className="p-5">
        <h2 className='text-3xl font-bold mb-10'>
          Статистика
        </h2>
        <div className='articles p-3 flex'>
          <div className="programming p-2 flex-1">
            <h3 className='text-3xl mb-2 text-center'>
              Программирование
            </h3>
            <ol className='list-decimal'>
              {renderRaports("programming")}
            </ol>
          </div>
          <div className="projects flex-1">
            <h3 className='text-3xl mb-2 text-center'>
              Ардуино
            </h3>
            <ol className='list-decimal'>
              {renderRaports("projects")}
            </ol>
          </div>
          <div className="modeling flex-1">
            <h3 className='text-3xl text-center'>
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