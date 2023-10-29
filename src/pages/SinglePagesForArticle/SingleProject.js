import { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchArticle } from "../../store/asyncAction/article";
import createArticle from "../../utilities/utilities";
import './pages.css';

const SingleProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(state => state.client.article);

  useEffect(() => {
    dispatch(fetchArticle(id, 'projects'));
  }, []);

  return (
    <main className="main__content">
      <div className="container">
        <h2 className="main__page-title">
          article project #{id}
        </h2>
        <div className="main__article">
          {createArticle(article).map((item, i) => {
            return (
              <Fragment key={i}>
                {item}
              </Fragment>
            );
          })}
        </div>
      </div>
    </main>
  )
}

export default SingleProject;

