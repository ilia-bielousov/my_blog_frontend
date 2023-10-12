import { Link } from "react-router-dom";

import './AdminHome.css';

const AdminHome = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="main__inner-admin">
          <article className="main__admin-article">
            <p className="main__admin-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus officia magni hic doloremque, soluta debitis iure necessitatibus accusantium, earum id esse voluptatum cumque minima! Vero est expedita eius a similique error atque molestias ipsam quos delectus illo quo rem, mollitia sequi sit in cum autem, perspiciatis quia consequatur ipsa ab. Animi dolores tempore cum magni aut quae molestias vitae commodi incidunt optio consequatur, nam distinctio culpa minima ipsa, modi natus fugit. Molestiae, molestias minima necessitatibus eos excepturi aliquam iure tempora laboriosam quisquam quidem a sit praesentium blanditiis distinctio, quo nisi corporis. Beatae earum natus aspernatur dicta sapiente ab alias placeat.
            </p>
          </article>
          <aside className="main__aside">
            <nav className="nav__admin">
              <ul className="nav__admin-list">
                <li className="nav__admin-item">
                  <Link
                    className="nav__admin-link"
                    to="create-card"
                    key={'create-card'}
                  >
                    Create a article
                  </Link>
                </li>
                <li className="nav__admin-item">
                  <Link
                    className="nav__admin-link"
                    to="edit-article"
                    key={'edit-article'}
                  >
                    Edit a article
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default AdminHome;