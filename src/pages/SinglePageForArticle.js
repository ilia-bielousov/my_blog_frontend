import { useEffect, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import { removeStateArticle } from "../store/clientReducer";
import { fetchArticle } from "../store/asyncAction/article";
import createArticle from "../utilities/utilities";

const SinglePageForArticle = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const article = useSelector(state => state.client.article);

  useEffect(() => {
    dispatch(removeStateArticle());
    dispatch(fetchArticle(id, pathname.split('/')[1]));

    axios.patch(`http://localhost:4000${pathname}`, { id })
      .then(() => { })
      .catch(() => { });
  }, []);

  const renderArticle = () => {
    if (article.status === 404) {
      return (
        <div className="flex h-full flex-col justify-center items-center">
          <span className="text-8xl font-medium mb-4">404</span>
          <p className="text-2xl">
            Такой статьи не существует.
          </p>
        </div>
      )
    } else {
      return (
        <>
          {createArticle(article.content).map((item, i) => {
            return (
              <Fragment key={i}>
                {item}
              </Fragment>
            );
          })
          }
        </>
      )
    }
  }

  return (
    <main className="flex flex-1">
      <div className="w-9/12 flex flex-1 justify-between gap-5">
        <article className="w-9/12 flex-1 pl-32">
          {article ?
            renderArticle()
            :
            // спиннер 
            <div role="status" className="flex justify-center p-5">
              <svg aria-hidden="true" className="w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
          }
        </article>
        {article && article.status !== 404 ?
          <aside className="w-3/12">
            здесь добавить другие статьи из рубрики
          </aside>
          :
          null
        }
      </div>
    </main>
  )
}

export default SinglePageForArticle;