import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import arrow from './../assets/images/arrow-back.svg'

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);

  // Показываем стрелку везде, кроме главной страницы
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
    const handleScroll = () => window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-md:flex max-md:justify-center max-md:items-center">

      {showArrow && (
        // Стрелка на Десктопе: Фиксированная полоса слева (w-20)
        // Стрелка на Мобильном: Абсолютное позиционирование слева от заголовка
        <div
          className={`
            fixed top-0 left-0 bottom-0 z-20 
            hidden md:flex flex-col justify-center items-center w-20 
            transition-all duration-300
            ${scrolled ? '' : ''} 
            hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer group
          `}
          onClick={handleGoBack}
          title="Назад"
        >
          {/* Сама иконка стрелки */}
          <img
            alt="назад"
            src={arrow}
            className="w-8 h-8 opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300"
          />
        </div>
      )}

      {/* Мобильная стрелка (отдельно, чтобы не ломать верстку) */}
      {showArrow && (
        <div className="md:hidden absolute left-4 top-6 z-20" onClick={handleGoBack}>
          <img src={arrow} alt="back" className="w-6 h-6 opacity-70" />
        </div>
      )}

      <header className="md:ml-24 ml-3 py-6">
        <span className="text-4xl max-md:text-3xl font-bold relative z-10 text-slate-900 dark:text-white">
          <Link to='./' key='/'>
            Мой блог
          </Link>
        </span>
      </header>
    </div>
  );
};

export default Header;