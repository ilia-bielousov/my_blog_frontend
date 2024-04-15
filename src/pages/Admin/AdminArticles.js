import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchForAllCards } from '../../store/asyncAction/cardsAdmin';
import { fetchForAllArticle } from '../../store/asyncAction/articlesAdmin';

const categories = [
  {
    name: 'Программирование',
    block: 'programming'
  },
  {
    name: 'Ардуино',
    block: 'projects'
  },
  {
    name: 'Моделирование',
    block: 'modeling'
  },
];

const AdminArticles = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);
  const allArticles = useSelector(state => state.admin.raportsArticles.articles);
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(fetchForAllCards());
    dispatch(fetchForAllArticle());
  }, []);

  if (!token) {
    alert('У вас нет доступа, чтобы создавать/редактировать статьи.')
    return <Navigate to='/' />
  }

  const renderRaports = (block) => {
    return allCards.map((card, key) => {
      if (block === card.choose) {
        const t = allArticles.map(article => {
          if (article.card === card._id) {
            return article.views;
          }
        });

        return (
          <li className='mb-1 text-xl flex flex-col p-2 border-2' key={key}>
            <div className='flex justify-between mb-5'>
              <span className='font-semibold flex-1'>Название статьи:</span> <span className='flex-1 text-end'>{card.name} </span>
            </div>
            <div className='flex flex-col justify-between mb-5'>
              <span className='font-semibold flex-1'>Описание статьи:</span> <span className='flex-1'>{card.description} </span>
            </div>
            <div className='flex justify-between mb-5'>
              <span className='font-semibold flex-1'>количество просмотров:</span> <span className='flex-1 text-end font-bold'>{t}.</span>
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
        <div className='articles p-3 flex gap-5 '>
          {categories.map((item, key) => {
            return (
              <div key={key}
                className="programming flex-1">
                <h3 className='text-3xl mb-2 text-center'>
                  {item.name}
                </h3>
                <ol className='list-decimal'>
                  {renderRaports(item.block)}
                </ol>
              </div>
            )
          })}
        </div>
      </article>
    </main >
  );
};

export default AdminArticles;