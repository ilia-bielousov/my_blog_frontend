import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.main className="main__content"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className="container">
        <h1>
          Home page
        </h1>
      </div>
    </motion.main>
  )
}

export default Home;