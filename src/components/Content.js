import { useLocation } from "react-router-dom";

import Card from "./Card";

const Content = ({ data }) => {
  const { pathname } = useLocation();

  const path = pathname.replace(/\//g, '') || '/';

  if (!data || !Array.isArray(data)) return null;

  return (
    <>
      {data.map((card, i) => {
        if (card.choose === path && path !== '/') {
          return (
            <Card
              key={card._id || card.pseudoName || i}
              name={card.name}
              description={card.description}
              choose={card.choose}
              image={card.image}
              pseudoName={card.pseudoName}
            />
          )
        } else if (path === '/') {
          return (
            <Card
              key={card._id || card.pseudoName || i}
              name={card.name}
              description={card.description}
              choose={card.pseudoName}
              image={card.image}
            />
          )
        }

        return null;
      })}
    </>
  )
}

export default Content;