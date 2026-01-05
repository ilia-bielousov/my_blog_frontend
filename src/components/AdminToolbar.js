import { Link, useLocation } from 'react-router-dom';

const Icons = {
  home: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>,
  create: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>,
  drafts: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  edit: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
  chart: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>,

  // НОВАЯ ИКОНКА (Стопка карточек)
  cards: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" /></svg>
};

const AdminToolbar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { to: "../admin", label: "Главная", icon: Icons.home },
    { to: "create-card", label: "Создать статью", icon: Icons.create },
    { to: "drafts", label: "Черновики", icon: Icons.drafts },

    // Новая ссылка на редактирование карточек
    { to: "edit-cards", label: "Карточки", icon: Icons.cards },

    { to: "edit-article", label: "Редактировать", icon: Icons.edit },
    { to: "articles", label: "Аналитика", icon: Icons.chart },
  ];

  const isActive = (path) => {
    if (path === '../admin' && location.pathname.endsWith('admin')) return true;
    return location.pathname.includes(path) && path !== '../admin';
  };

  return (
    <nav
      className={`
            fixed left-0 top-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-30 
            transition-all duration-300 ease-in-out flex flex-col
            ${isOpen ? 'w-72' : 'w-20'} 
        `}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-9 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full p-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-300 shadow-sm z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="flex flex-col h-full overflow-hidden">
        <div className={`h-20 flex items-center ${isOpen ? 'px-6' : 'justify-center'} border-b border-slate-100 dark:border-slate-700/50 transition-all duration-300`}>
          {isOpen ? (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              Workspace<span className="font-light text-slate-500 dark:text-slate-400">.Admin</span>
            </span>
          ) : (
            <span className="text-xl font-bold text-blue-600">W</span>
          )}
        </div>

        <ul className='flex-1 py-6 px-3 space-y-2'>
          {menuItems.map((item) => {
            const active = isActive(item.to);
            return (
              <li key={item.label} title={!isOpen ? item.label : ''}>
                <Link
                  to={item.to}
                  className={`
                    flex items-center rounded-xl transition-all duration-200 group
                    ${isOpen ? 'px-3 py-3 w-full' : 'justify-center py-3 w-full'}
                    ${active
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'}
                `}
                >
                  <span className={`
                    ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}
                    ${isOpen ? 'mr-3' : ''} 
                `}>
                    {item.icon}
                  </span>

                  {isOpen && (
                    <span className="font-medium whitespace-nowrap opacity-100 transition-opacity duration-300">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700/50">
          <a
            href="./../"
            target='_blank'
            rel="noreferrer"
            title="Открыть блог"
            className={`
                flex items-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all
                ${isOpen ? 'justify-center w-full p-2 text-sm' : 'justify-center w-full p-2 bg-slate-50 dark:bg-slate-800'}
              `}
          >
            {isOpen ? (
              <>
                Перейти в блог
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
              </>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default AdminToolbar;