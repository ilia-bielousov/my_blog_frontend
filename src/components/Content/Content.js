import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import './Content.css';

const Content = ({ data }) => {
  const { pathname } = useLocation();

  return (
    <main className='main__content'>
      <div className="container">
        <div className='cards'>
          {data.map((card, i) => {
            if (card.choose === pathname.slice(1, pathname.length-1))
            return (
              <Card
                key={i}
                id={card._id}
                name={card.name}
                description={card.description}
                choose={card.choose}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Content;