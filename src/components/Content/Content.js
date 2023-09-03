import { motion } from 'framer-motion';

import Card from "../Card/Card";
import './Content.css';

const Content = ({ data, name }) => {
  const CreateThecards = data.map(card => {
    return (
      <Card
        key={card.id}
        id={card.id}
        title={card.title}
        description={card.description}
        name={name}
      />
    )
  });

  return (
    <motion.main className='main__content'
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className="container">
        <div className='cards'>
          {CreateThecards}
        </div>
      </div>
    </motion.main>
  )
}

export default Content;