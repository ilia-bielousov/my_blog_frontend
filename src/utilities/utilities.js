import { useState, createElement } from "react";
import CodeExample from "../components/CodeExample";
import axios from "axios";

const RenderImage = ({ imageSource }) => {
  const [image, setImage] = useState('');
  const [alt, setAlt] = useState('');

  axios.get(`${process.env.REACT_APP_API_URL}upload/${imageSource}`)
    .then(res => {
      setImage(`data:image/format;base64,${res.data.data[0].imageSource}`);
      setAlt(res.data.data[0].imageUrl);
    })
    .catch(err => console.log(err)) // нужно будет обработать ошибку

  return (
    <img alt={alt} src={image} className='mx-auto p-3' />
  )
}


const createArticle = (content) => {
  const t = Object.entries(content);

  return t.map(item => {
    const renderElement = () => {
      switch (item[1].tag) {
        case 'code':
          return (
            <CodeExample language={item[1].language} code={item[1].text} />
          );
        case 'img': {
          return (
            <div className="mx-auto">
              <RenderImage imageSource={item[1].image} />
            </div>
          )
        }
        case 'iframe': {
          return (
            <div className="mx-auto min-w-72 px-2 mb-3 max-w-7xl">
              {createElement('div', { className: 'max-w:lg mx-auto relative pt-[56.25%]', dangerouslySetInnerHTML: { __html: item[1].text } })}
            </div>
          )
        }
        case 'ul': {
          const list = item[1].list.split('\n');

          return (
            <ul className="text-lg pl-5 mb-5">
              {list[0]}
              {list.map((l, i) => {
                return (i === 0 || i === list.length ? null :
                  (<li key={i} className="list-disc text-base ">
                    {l};
                  </li>))
              })}
            </ul>
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

export { createArticle };
export { RenderImage };