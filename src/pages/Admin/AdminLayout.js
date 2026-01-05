import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminToolbar from '../../components/AdminToolbar';
import Footer from '../../components/Footer';

const AdminLayout = () => {
  // --- ЛОГИКА ТЕМЫ ---
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // --- ЛОГИКА САЙДБАРА ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans text-slate-800 dark:text-slate-200 selection:bg-blue-500 selection:text-white">

      {/* Передаем состояние и функции управления в тулбар */}
      <AdminToolbar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Основной контейнер. Меняем padding-left в зависимости от ширины меню */}
      <div
        className={`
          relative min-h-screen flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'pl-72' : 'pl-20'}
        `}
      >

        {/* Хедер с кнопкой темы */}
        <header className="flex justify-between items-center p-6 sticky top-0 z-20 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">

          {/* Хлебные крошки или заголовок (пока пусто, но место есть) */}
          <div></div>

          {/* Кнопка Темы */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Включить светлую тему" : "Включить темную тему"}
            className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm group"
          >
            {isDark ? (
              // Солнце
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500 group-hover:rotate-90 transition-transform duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              // Луна
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform duration-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
        </header>

        {/* Контент */}
        <div className="flex-1 px-8 pb-8">
          <Outlet />
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;