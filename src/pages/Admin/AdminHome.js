import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

const AdminHome = () => {
  const [token,] = useState(localStorage.getItem('admin'));

  if (!token) {
    return <Navigate to='/' />
  }

  // Данные для карточек возможностей
  const features = [
    {
      title: "1. Создание Карточек",
      desc: "Начните с создания 'обложки' для статьи. Укажите название, описание, категорию (IT, Проекты, Моделирование) и загрузите превью-изображение.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
      title: "2. Конструктор Статей",
      desc: "Полноценный Drag-n-Drop редактор. Перетаскивайте блоки (Заголовки, Текст, Код, Картинки) из панели инструментов. Поддержка загрузки изображений на сервер.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      ),
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      title: "3. Черновики и Публикация",
      desc: "Работайте в безопасном режиме. Статьи сначала попадают в 'Черновики'. Публикуйте их на сайт только когда они полностью готовы. Черновики не видны обычным пользователям.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
      title: "4. Управление и Редактирование",
      desc: "Нашли ошибку? Нужно дополнить код? Перейдите в раздел редактирования, выберите статью и измените любой блок. Поддерживается обновление текста, картинок и кода на лету.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    }
  ];

  return (
    <main className="max-w-5xl pt-10 mx-auto px-4 pb-20">

      {/* Приветствие */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 mb-8">
        <div className="flex items-center space-x-5 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
            </svg>
          </div>
          <div>
            <h2 className='text-3xl font-bold text-slate-900 dark:text-white tracking-tight'>
              Панель управления
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">
              Добро пожаловать, Администратор.
            </p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
          <p className="text-lg leading-relaxed">
            Это командный центр вашего блога. Здесь вы имеете полный контроль над контентом: от создания черновых набросков до публикации технически сложных статей с примерами кода и медиа-файлами.
          </p>
        </div>

        {/* Кнопка быстрого действия */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
          <Link
            to="/admin/create-card"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Создать новую запись
          </Link>
        </div>
      </div>

      {/* Сетка возможностей */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((item, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${item.color}`}>
                {item.icon}
              </div>
              <span className="text-xs font-bold text-slate-300 dark:text-slate-600 select-none">0{index + 1}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {item.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </main >
  );
};

export default AdminHome;