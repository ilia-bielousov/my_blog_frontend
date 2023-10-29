import { createElement } from "react"

const createArticle = (content) => {
  console.log(content);
  
  const t = Object.entries(content);

  return t.map(item => {
    const element = createElement(
      item[1].tag,
      { className: item[1].className, src: (item[1].src ? item[1].src : null) },
      item[1].text,
    );

    return (
      <>
        {element}
      </>
    )
  });
}

export default createArticle;