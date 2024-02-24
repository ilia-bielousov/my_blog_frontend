import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchArticle } from "../../store/asyncAction/article";

import NewTagForEdit from "./components/NewTagForEdit";


const AdminEditSingleArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(state => state.client.article);
  const [statusEditArticle, setStatusEditArticle] = useState(false);

  useEffect(() => {
    dispatch(fetchArticle(id, 'admin/edit-article'));
  }, []);

  const test = (e) => {
    console.log(e.target);
  }

  const sendEditArticle = (e) => {
    e.preventDefault();

    setStatusEditArticle(true);
  }

  return (
    <main className="flex-1 pl-72">
      <article className="max-w-3xl p-5">
        <h1 className="text-3xl font-bold mb-2">
          Редактирование статьи
        </h1>
        <form onSubmit={sendEditArticle}>
          {article ? article[0].content.map((item, key) => {
            return (
              <NewTagForEdit
                key={key}
                tag={item.tag}
                text={item.text}
                className={item.className}
                id={item.id}
                list={item.list}
                language={item.language}
                statusEditArticle={statusEditArticle}
                test={test}
              />
            )
          }) : null}
          <input
            type="submit"
            value="подтвердить"
            className="mx-auto block mt-5 py-3 px-6 border rounded-lg cursor-pointer hover:bg-slate-100 transition active:bg-slate-200"
          />
        </form>
      </article>
    </main >
  );
};

export default AdminEditSingleArticle;