import { useEffect, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticle } from "../store/asyncAction/article";
import { request } from '../utilities/request';
import createArticle from "../utilities/utilities";

const SinglePageForArticle = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const article = useSelector(state => state.client.article);

  useEffect(() => {
    dispatch(fetchArticle(id, pathname.split('/')[1]));
    request('PATCH', pathname.slice(1), { id });
  }, []);

  return (
    <main className="flex-1">
      <div className="w-1/2 mx-auto ">
        {article ? createArticle(article[0].content).map((item, i) => {
          return (
            <Fragment key={i}>
              {item}
            </Fragment>
          );
        }) : null}
      </div>
    </main>
  )
}

export default SinglePageForArticle;