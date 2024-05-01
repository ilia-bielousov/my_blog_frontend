import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrow from './../assets/images/arrow-back.svg'

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => window.scrollY > 50 ? setScrolled(true) : setScrolled(false);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="max-md:flex max-md:justify-center max-md:items-center">
      <div className={`fixed md:h-full h-16 z-10 transition md:hover:shadow-2xl md:shadow-xl block top-0 left-0 bottom-0 right-0 w-20 max-md:w-full max-md:mb-3 ${scrolled ? 'max-md:bg-slate-100/75' : ''} transition`}>
        <img
          alt="arrow"
          src={arrow}
          className="max-md:absolute max-md:top-3 sm:auto md:absolute h-full max-md:h-12 z-10 left-0 md:hover:-translate-x-1 w-18 md:cursor-pointer transition px-3"
          onClick={() => navigate(-1)}
        />
      </div>
      <header className="md:ml-24 ml-3 py-6">
        <span className="text-4xl max-md:text-3xl font-bold relative z-10">
          <Link
            to='./'
            key='/'
          >
            My blog
          </Link>
        </span>
      </header>
    </div>
  );
};

export default Header;