import { useLocation } from "react-router-dom";
import Card from "./Card";

const Content = ({ data }) => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\//g, '');

  return (
    <main className='flex flex-col justify-center flex-1'>
      <div className='flex content-center justify-center gap-5 max-lg:flex-col max-lg:items-center px-24 max-md:px-3 py-3'>
        <div className='grid grid-rows 2xl:grid-cols-3 gap-8 max-md:gap-4 xl:grid-cols-2 2xl:gap-5 xl:gap-3'>
          {data.map((card, i) => {
            if (card.choose === path) {
              return (
                <Card
                  key={i}
                  name={card.name}
                  description={card.description}
                  choose={card.choose}
                  image={card.image}
                  pseudoName={card.pseudoName}
                />
              )
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </main>
  )
}

export default Content;