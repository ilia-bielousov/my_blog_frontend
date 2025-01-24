import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from 'react-router-dom';

import { fetchForAllCards } from '../../store/asyncAction/cardsAdmin';


const AdminEdit = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(fetchForAllCards());
  }, []);

  if (!token) {
    alert('У вас нет доступа, чтобы создавать/редактировать статьи.')
    return <Navigate to='/' />
  }

  const renderCol = (block) => {
    return allCards.map((card, key) => {
      if (card.choose === block) {
        return (
          <Link to={`/admin/edit-article/${card.pseudoName}`}
            key={key}
            className="w-48 border-2 rounded-xl p-3 cursor-pointer transition hover:shadow-md hover:bg-slate-100">
            <h3 className="text-xl font-semibold">
              {card.name}
            </h3>
            <p className="">
              {card.description}
            </p>
          </Link>
        )
      }
    })
  }

  return (
    <main className="flex-1 pl-72">
      <article className="p-5">
        <h2 className='text-3xl font-bold mb-3'>
          Редактирование статьи
        </h2>
        <div className="flex flex-wrap gap-5">
          {renderCol('programming')}
          {renderCol('projects')}
          {renderCol('modeling')}
        </div>
      </article>
    </main>
  );
};

export default AdminEdit;