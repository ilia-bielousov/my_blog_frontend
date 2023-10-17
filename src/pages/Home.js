import Card from "../components/Card/Card";

import programming from './../assets/images/programming1.jpeg';
import arduino from './../assets/images/arduino.png';
import modeling from './../assets/images/modeling.png';

const menuContent = [
  {
    title: 'Programming',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    name: 'programming',
    img: programming
  },
  {
    title: 'Arduino',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    name: 'projects',
    img: arduino
  },
  {
    title: 'Modeling',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    name: 'modeling',
    img: modeling
  },
  {
    title: 'art',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    name: 'art'
  }
]

const Home = () => {
  return (
    <main className="main__content">
      <div className="container">
        <div className="cards">
          {menuContent.map((card, i) => {
            return (
              <Card
                key={i}
                title={card.title}
                description={card.description}
                name={card.name}
                img={card.img}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Home;