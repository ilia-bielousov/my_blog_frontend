import { Link, useNavigate } from "react-router-dom";

import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link
            className="header__title-link"
            to='./'
            key='/'
          >
            site
          </Link>
        </h1>
        <div className="test">
          <button onClick={goBack}>
            back
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;