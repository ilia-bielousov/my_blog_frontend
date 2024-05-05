import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SkeletonCards from "./SkeletonCards";
import Card from "./Card";


const Content = ({ data, loading, setLoading }) => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\//g, '');
  const statusLoading = loading ? <SkeletonCards /> : null
  const content = data && data.length ? data : null;


  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <main className='flex flex-col justify-center flex-1'>
      <div className='flex content-center justify-center gap-8 max-md:gap-4 max-xl:flex-col max-xl:items-center px-24 py-3 max-md:px-3 flex-wrap'>
        {statusLoading}
        {content && content.map((card, i) => {
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
        {content === null ?
          <div className="flex flex-1 justify-center items-center">
            <p className="text-3xl">
              Пока ничего нет :(
            </p>
          </div>
          : null
        }
      </div>
    </main>
  )
}

export default Content;