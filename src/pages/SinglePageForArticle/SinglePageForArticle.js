import { useEffect, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticle } from "../../store/asyncAction/article";
import createArticle from "../../utilities/utilities";
import './pages.css';

const SinglePageForArticle = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const article = useSelector(state => state.client.article);
  
  useEffect(() => {
    dispatch(fetchArticle(id, pathname.split('/')[1]));
  }, []);

  return (
    <main className="main__content">
      <div className="container">
        <h2 className="main__page-title">
          article Modeling #
        </h2>
        {article ? createArticle(article[0].content).map((item, i) => {
          return (
            <Fragment key={i}>
              {item}
            </Fragment>
          );
        }) : null }
      </div>
    </main>
  )
}

export default SinglePageForArticle;