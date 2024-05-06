import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SkeletonCards from "./SkeletonCards";
import Card from "./Card";

const Content = ({ data }) => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  const path = pathname.replace(/\//g, '');

  const statusLoading = loading ? <SkeletonCards /> : null
  const content = data || null;
  useEffect(() => {
    setLoading(true);

    if (data && data.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <main className='flex flex-col justify-center flex-1'>
      <div className='flex content-center justify-center gap-8 max-md:gap-4 max-xl:flex-col max-xl:items-center px-24 py-3 max-md:px-3 flex-wrap'>
        <div className='grid grid-rows 2xl:grid-cols-3 gap-8 max-md:gap-4 xl:grid-cols-2 2xl:gap-5 xl:gap-3'>
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
        </div>
      </div>
    </main>
  )
}

export default Content;