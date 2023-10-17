import { Link } from "react-router-dom";

import './Header.css';

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;