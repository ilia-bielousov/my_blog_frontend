import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminHome = () => {
  const [token,] = useState(localStorage.getItem('admin'));

  if (!token) {
    alert('Требуется авторизация')
    return <Navigate to='/' />
  }

  return (
    <main className="max-w-4xl pt-10 m-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 transition-colors duration-300">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
              Добро пожаловать в панель управления
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Система готова к работе
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
          <p className="text-lg">
            Это ваше рабочее пространство. Здесь вы можете управлять контентом блога, отслеживать статистику и редактировать материалы.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Быстрый старт</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Перейдите в раздел "Создать статью", чтобы добавить новый материал.</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Статистика</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">В разделе "Аналитика" доступны данные по просмотрам.</p>
            </div>
          </div>

          <p>
            Используйте меню слева для навигации. Приятной работы!
          </p>
        </div>
      </div>
    </main >
  );
};

export default AdminHome;