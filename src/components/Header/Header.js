import { Link } from "react-router-dom";

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__title-link">
          <h1 className="header__title">
            test
          </h1>
        </Link>
        <nav className="header__navigation nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/projects" className="nav__link">
                Arduino
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/modeling" className="nav__link">
                Modeling
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;