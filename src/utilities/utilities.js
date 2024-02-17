import { Fragment, createElement } from "react";
import CodeExample from "../components/CodeExample";


const createArticle = (content) => {
  const t = Object.entries(content);

  return t.map(item => {

    const renderElement = () => {
      switch (item[1].tag) {
        case 'code':
          return (
            <CodeExample language={'c'} code={item[1].text} />
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
        case 'iframe': { // тут закончил, пока не понятно как добавлять видео
          return (
            <div className="mx-auto min-w-72 px-2 mb-3 max-w-7xl">
              {createElement('div', { className: 'w-full', dangerouslySetInnerHTML: { __html: item[1].text } })}
            </div>
          )
        }
        default: {
          return createElement(
            item[1].tag,
            { className: item[1].className, dangerouslySetInnerHTML: { __html: item[1].text } }
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