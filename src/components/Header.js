import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const showArrow = pathname !== '/';

  const handleGoBack = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 1) {
      navigate('/');
    } else if (pathSegments.length > 1) {
      const category = pathSegments[0];
      navigate(`/${category}`);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const ArrowIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );

  return (
    <div className="max-md:flex max-md:justify-center max-md:items-center relative">

      {showArrow && (
        <div
          className={`
            fixed top-0 left-0 bottom-0 z-20 
            hidden md:flex flex-col justify-center items-center w-20 
            transition-all duration-300
            ${scrolled ? '' : ''} 
            mouse:bg-slate-100/50 dark:mouse:bg-slate-800/50 cursor-pointer group
          `}
          onClick={handleGoBack}
          title="Назад"
        >
          <ArrowIcon
            className="w-8 h-8 text-slate-700 dark:text-white opacity-60 group-mouse:opacity-100 group-mouse:-translate-x-1 transition-all duration-300"
          />
        </div>
      )}

      {showArrow && (
        <div className="md:hidden absolute left-4 top-6 z-20" onClick={handleGoBack}>
          <ArrowIcon
            className="w-6 h-6 text-slate-900 dark:text-white opacity-70"
          />
        </div>
      )}

      <header className="md:ml-24 ml-3 py-6">
        <span className="text-4xl max-md:text-3xl font-bold relative z-10 text-slate-900 dark:text-white transition-colors duration-300">
          <Link to='./' key='/'>
            Мой блог
          </Link>
        </span>
      </header>

      <button
        onClick={toggleTheme}
        className="fixed top-5 right-5 z-50 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 mouse:bg-slate-200 dark:mouse:bg-slate-700 transition-all shadow-sm"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        )}
      </button>

    </div>
  );
};

export default Header;