import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import './Card.css';

export default function Card({ id, title, description, name }) {

  return (
    <motion.div className="card"
    initial={{ opacity: 1, y: 0 }}
    animate={{ opacity: 9, y: 1 }}
    transition={{ duration: 0.3, ease: 'linear' }}
    >
      <img src="https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb" alt="Man with backpack"
        className="card__img" />
      <div className="card__text">
        <h1 className="card__title">
          {title}
        </h1>
        <p className="card__desc">
          {description}
        </p>
      </div>
      <Link to={`/${name}/${id}`} className="card__link">
        Read More
      </Link>
    </motion.div>
  )
}