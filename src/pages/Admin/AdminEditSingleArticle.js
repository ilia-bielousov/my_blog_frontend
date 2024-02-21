import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../store/asyncAction/article";

import NewTagForEdig from "./components/NewTagForEdit";


const AdminEditSingleArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(state => state.client.article);

  useEffect(() => {
    dispatch(fetchArticle(id, 'admin/edit-article'));
  }, []);

  return (
    <main className="flex-1 pl-72">
      <article className="max-w-3xl p-5">
        <h1 className="text-3xl font-bold mb-2">
          Редактирование статьи
        </h1>
        {article ? article[0].content.map((item, key) => {
          return (
            <NewTagForEdig
              key={key}
              tag={item.tag}
              text={item.text}
              list={item.list}
              language={item.language}
            />
          )
        }) : null}
      </article>
    </main >
  );
};

export default AdminEditSingleArticle;