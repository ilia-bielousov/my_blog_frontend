import { Link, useNavigate } from "react-router-dom";
import arrow from './../assets/images/arrow-back.svg'

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed h-full z-10 transition hover:shadow-2xl shadow-xl block top-0 left-0 bottom-0 right-0  w-20">
        <img
          alt="arrow"
          src={arrow}
          className="absolute h-full z-10 left-0 hover:-translate-x-1 w-18 cursor-pointer transition px-3"
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