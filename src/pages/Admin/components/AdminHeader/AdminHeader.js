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
          <h1 className="header__title-admin">
            Admin panel
          </h1>
        </Link>
      </div>
    </header >
  );
};

export default AdminHeader;