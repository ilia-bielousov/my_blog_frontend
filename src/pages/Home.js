import Card from "../components/Card";

import programming from './../assets/images/programming1.jpeg';
import arduino from './../assets/images/arduino1.png';
import modeling from './../assets/images/modeling.png';

const menuContent = [
  {
    name: 'programming',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    img: programming
  },
  {
    name: 'projects',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    img: arduino
  },
  {
    name: 'modeling',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    img: modeling
  },
]

const Home = () => {
  return (
    <main className="flex flex-col justify-center flex-1">
      <div className="flex content-center justify-center gap-8 max-xl:flex-col max-xl:items-center px-24">
        {menuContent.map((card, i) => {
          return (
            <Card
              key={i}
              description={card.description}
              choose={card.name}
              img={card.img}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Home;