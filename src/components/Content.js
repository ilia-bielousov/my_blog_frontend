import { useLocation } from "react-router-dom";
import Card from "./Card";

const Content = ({ data }) => {
  const { pathname } = useLocation();

  return (
    <main className='flex flex-col justify-center flex-1'>
      <div className='flex content-center justify-center gap-8 max-lg:flex-col max-lg:items-center px-24'>
        {data.map((card, i) => {
          if (card.choose === pathname.slice(1, pathname.length - 1))
            return (
              <Card
                key={i}
                id={card._id}
                name={card.name}
                description={card.description}
                choose={card.choose}
                image={card.image}
              />
            )
        })}
      </div>
    </main>
  )
}

export default Content;