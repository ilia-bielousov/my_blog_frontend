import { createElement } from "react";

const createArticle = (content) => {
  const t = Object.entries(content);

  return t.map(item => {

    const renderElement = () => {
      switch (item[1].tag) {
        case 'code':
          return (
            <pre className="bg-slate-100 p-5 my-3">
              {createElement(
                item[1].tag,
                { className: item[1].className },
                item[1].text,
              )}
            </pre>
          );
        case 'img': {
          return (
            <div className="mx-auto">
              {createElement(
                item[1].tag,
                { className: item[1].className, src: item[1].image, alt: item[1].alt },
              )}
            </div>
            // возможно тут, можно добавить еще подпись, пока подумаю
          )
        }
        default: {
          return createElement(
            item[1].tag,
            { className: item[1].className },
            item[1].text ? item[1].text : null,
          );
        }
      }
    }
    return (
      <>
        {renderElement()}
      </>
    )
  });
}

export default createArticle;