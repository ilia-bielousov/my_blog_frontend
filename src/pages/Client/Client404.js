import { useNavigate } from "react-router-dom";

const Client404 = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center min-h-[80vh] w-full px-4">
      <div className="text-center">
        <div className="relative mx-auto w-32 h-32 mb-6">
          <svg className="w-full h-full text-slate-200 dark:text-slate-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-4xl text-slate-400 dark:text-slate-500">
            ?
          </div>
        </div>

        <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4">
          404
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Упс! Похоже, вы заблудились. Этой страницы не существует или она была удалена.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold mouse:bg-slate-50 dark:mouse:bg-slate-800 transition-colors"
          >
            Вернуться назад
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold mouse:bg-blue-700 shadow-lg shadow-blue-600/20 transition-transform active:scale-95"
          >
            На главную
          </button>
        </div>

      </div>
    </main>
  );
};

export default Client404;