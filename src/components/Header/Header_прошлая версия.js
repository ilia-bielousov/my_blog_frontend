import { Link } from "react-router-dom";

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link
          className="header__title-link"
          to="/"
          key={'/'}
        >
          <h1 className="header__title">
            Site
          </h1>
        </Link>
        <nav className="header__navigation nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                className="nav__link"
                to="/projects"
                key={'/projects'}
              >
                Arduino
              </Link>
            </li>
            <li className="nav__item">
              <Link
                className="nav__link"
                to="/modeling"
                key={'/modeling'}
              >
                Modeling
              </Link>
            </li>
            <li className="nav__item">
              <Link
                className="nav__link"
                to="/art"
                key={'/art'}
              >
                Art
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;