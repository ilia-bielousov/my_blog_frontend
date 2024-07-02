import { useState, createElement, useEffect } from "react";

import axios from "axios";
import CodeExample from "../components/CodeExample";

import noImg from './../assets/images/no-img.svg'

const RenderImage = ({ imageSource }) => {
  const [image, setImage] = useState('');
  const [alt, setAlt] = useState('');

  axios.get(`${process.env.REACT_APP_API_URL}upload/${imageSource}`)
    .then(res => {
      setImage(`data:image/format;base64,${res.data.data[0].imageSource}`);
      setAlt(res.data.data[0].imageUrl);
    })
    .catch(() => {
      setImage(noImg);
      setAlt('no picture');
    })

  return (
    <img alt={alt} src={image} className={noImg ? 'mx-auto p-3' : 'object-cover h-64'} />
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
          const list = item[1].text.split('\n');

          return (
            <ul className="text-lg pl-5 mb-5">
              {list[0]}
              {list.map((l, i) => {
                return (i === 0 || i === list.length ? null :
                  (<li key={i} className="list-disc text-base ">
                    {l}
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

const transliterate = (text) => {
  const transliterationMap = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '\'', ы: 'y', ь: '\'', э: 'e', ю: 'yu', я: 'ya',
  };

  return text.split('').map(char => transliterationMap[char] || char).join('');
};

export { createArticle };
export { RenderImage };
export { transliterate };