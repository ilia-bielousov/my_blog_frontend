import { Link } from 'react-router-dom';

import './Card.css';

export default function Card({ choose, name, description, id, img}) {
  
  return (
    <div className="card">
      <Link to={`/${choose}/${id ? id : ''}`} className="card__link">
        <img src={img ? img : "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb"} alt="Man with backpack"
          className="card__img" />
        <div className="card__text">
          <h2 className="card__title">
            {name ? name : choose}
          </h2>
          <p className="card__desc">
            {description}
          </p>
        </div>
      </Link>
    </div>
  )
}