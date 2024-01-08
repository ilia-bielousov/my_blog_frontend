import { createElement } from "react"

const createArticle = (content) => {
  const t = Object.entries(content);

  return t.map(item => {
    const element = createElement(
      item[1].tag,
      { className: item[1].className, src: (item[1].image ? item[1].image : null), alt: (item[1].alt ? item[1].alt : null) },
      item[1].text ? item[1].text : null,
    );

    return (
      <>
        {element}
      </>
    )
  });
}

export default createArticle;