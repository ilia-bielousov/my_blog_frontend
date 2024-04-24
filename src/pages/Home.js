import Card from "../components/Card";

import programming from './../assets/images/programming1.jpeg';
import arduino from './../assets/images/arduino1.png';
import modeling from './../assets/images/modeling.png';

const menuContent = [
  {
    name: 'programming',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    image: programming
  },
  {
    name: 'projects',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    image: arduino
  },
  {
    name: 'modeling',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, facere!',
    image: modeling
  },
]

const Home = () => {
  return (
    <main className="flex flex-col justify-center flex-1">
      <div className="flex content-center justify-center gap-8 max-md:gap-4 max-xl:flex-col max-xl:items-center px-24 py-3 max-md:px-3 flex-wrap">
        {menuContent.map((card, i) => {
          return (
            <Card
              key={i}
              description={card.description}
              choose={card.name}
              image={card.image}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Home;