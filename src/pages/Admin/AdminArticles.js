import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForAllCards } from '../../store/asyncAction/allCards';
import { fetchForAllArticle } from '../../store/asyncAction/allArticles';
import { request } from "../../utilities/request";

const AdminArticles = () => {
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.admin.raportsArticles.cards);
  // const allArticles = useSelector(state => state.admin.raportsArticles.articles);

  useEffect(() => {
    dispatch(fetchForAllCards());
    // dispatch(fetchForAllArticle());
  }, []);

  return (
    <main className="flex-1 pl-72">
      <article className="p-5">
        <h2>
          articles
        </h2>
        {/* нужно подумать как теперь можно, что теперь с ними можно сделать */}
      </article>
    </main>
  );
};

export default AdminArticles;