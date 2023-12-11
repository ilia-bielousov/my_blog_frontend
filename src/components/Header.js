import { Link, useNavigate } from "react-router-dom";
import arrow from './../assets/images/arrow-back.svg'

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute z-10 transition hover:shadow-2xl shadow-xl block left-0 top-0 h-full w-20">
        <img
          alt="arrow"
          src={arrow}
          className="absolute z-10 h-full left-3 hover:-translate-x-1 w-14 cursor-pointer transition"
          onClick={() => navigate(-1)}
        />
      </div>
      <header className="ml-24 py-6">
        <h1 className="text-4xl font-bold">
          <Link
            to='./'
            key='/'
          >
            My blog
          </Link>
        </h1>
      </header>
    </>
  );
};

export default Header;