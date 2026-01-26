import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { createArticle } from "../../utilities/utilities.js";

const Review = () => {
  const { id } = useParams();
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios.get(`${process.env.REACT_APP_API_URL}admin/preview/${id}`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setPreviewData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки превью", err);
        setLoading(false);
      });
  }, [id]);

  const renderSpinner = () => (
    <div className="flex justify-center py-20 min-h-[50vh]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-slate-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-600 border-t-transparent shadow-md"></div>
      </div>
    </div>
  );

  if (loading) return renderSpinner();

  if (!previewData) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-slate-500">
        Нет данных для предпросмотра
      </div>
    );
  }

  return (
    <>
      <main className="w-full max-w-[1400px] mx-auto min-h-[80vh] py-8 px-4 md:pl-24">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <article className="w-full lg:w-[70%] bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-12 animate-fadeIn">
            <nav className="mb-6 flex justify-between items-center">
              <button
                onClick={() => window.close()}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Закрыть предпросмотр
              </button>

              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full uppercase tracking-wider">
                Preview Mode
              </span>
            </nav>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-bold break-words">
              {createArticle(previewData.content)}
            </div>
          </article>

          <aside className="w-full lg:w-[30%] space-y-8 opacity-60 pointer-events-none select-none">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm sticky top-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-slate-300 rounded-full"></span>
                Сайдбар (Пример)
              </h3>

              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 items-start p-2 border border-transparent rounded-lg">
                    <div className="shrink-0 w-20 h-16 rounded-md bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex flex-col flex-1 gap-2">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>
    </>
  );
};

export default Review;