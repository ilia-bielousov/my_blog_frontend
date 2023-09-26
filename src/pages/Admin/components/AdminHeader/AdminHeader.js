import { Link } from "react-router-dom";

import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <header className="header">
      <div className="container">
        <Link
          className="header__link-title"
          to="./"
          key={'./'}
        >
          <h1 className="header__title">
            Admin panel
          </h1>
        </Link>
        <nav className="header__navigation nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link
                className="nav__link"
                to="create-article"
                key={'create-article'}
              >
                Create a article
              </Link>
            </li>
            <li className="nav__item">
              <Link
                className="nav__link"
                to="edit-article"
                key={'edit-article'}
              >
                Edit a article
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header >
  );
};

export default AdminHeader;