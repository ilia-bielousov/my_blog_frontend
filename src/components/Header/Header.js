import './Header.css';

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <h1 className="header__title">
          Hobby
        </h1>
        <nav className="header__navigation nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a href="#first" className="nav__link">
                Arduino
              </a>
            </li>
            <li className="nav__item">
              <a href="#second" className="nav__link">
                Modeling
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}