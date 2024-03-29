import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import { fetchForAllCards } from '../../store/asyncAction/allCards';
import { fetchForAllArticle } from '../../store/asyncAction/allArticles';


const AdminEdit = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);

  useEffect(() => {
    dispatch(fetchForAllCards());
    dispatch(fetchForAllArticle());
  }, []);

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
          Редактировать статью
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