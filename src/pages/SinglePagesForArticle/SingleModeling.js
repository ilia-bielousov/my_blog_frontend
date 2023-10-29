import { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticle } from "../../store/asyncAction/article";
import createArticle from "../../utilities/utilities";
import './pages.css';

const SingleModeling = () => {
  const { id, pathname } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(state => state.client.article);

  console.log(pathname);
  
  useEffect(() => {
    dispatch(fetchArticle(id, 'modeling'));
  }, []);

  return (
    <main className="main__content">
      <div className="container">
        <h2 className="main__page-title">
          article Modeling #
        </h2>
        {createArticle(article).map((item, i) => {
          return (
            <Fragment key={i}>
              {item}
            </Fragment>
          );
        })}
      </div>
    </main>
  )
}

export default SingleModeling;