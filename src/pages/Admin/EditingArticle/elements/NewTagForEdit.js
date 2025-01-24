import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { RenderImage } from "../../../../utilities/utilities";

import picture from './../../../../assets/images/picture.svg';

const NewTagForEdit = (props) => {
  const [textContent, setTextContent] = useState('');
  const [file, setFile] = useState('');

  const tagRef = useRef();
  const { tag, text, id, className, list, language, article, image, alt } = props;

  useEffect(() => {
    setTextContent({ tag, text, id, className, list, language, image, alt });
  }, [props]);

  const changeText = (e) => {
    setTextContent(() => {
      if (tag === 'ul') {
        return {
          ...textContent,
          list: e.target.value
        }
      } else if (tag === 'code' && e.target.name) {
        return {
          ...textContent,
          language: e.target.value
        }
      } else {
        return {
          ...textContent,
          text: e.target.value
        }
      }
    });
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && tag !== 'ul' && tag !== 'code') {
      tagRef.current.blur();
    } else if (tag === 'ul' && e.key === 'Control') {
      tagRef.current.blur();
    } else if (e.key === 'Enter' && tag === 'code') {
      tagRef.current.blur()
    }

    article.content = article.content.map(tag => tag.id === id ? textContent : tag);
  }

  const determine = () => {
    if (textContent) {
      switch (textContent.tag) {
        case 'h1': {
          return (
            <input
              onKeyDown={onKeyDown}
              onChange={changeText}
              ref={tagRef}
              className="w-full p-2 outline-blue-700  border-2 rounded-xl"
              type="text"
              placeholder='Wpisz swój tekst'
              value={textContent.text}
            />
          )
        }
        case 'h2': {
          return (
            <input
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700  border-2 rounded-xl"
              type="text"
              placeholder='Wpisz swój tekst'
              value={textContent.text}
            />
          )
        }
        case 'h3': {
          return (
            <input
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700  border-2 rounded-xl"
              type="text"
              placeholder='Wpisz swój tekst'
              value={textContent.text}
            />
          )
        }
        case 'ul': {
          return (
            <textarea
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 resize-none h-60 border-2 rounded-xl"
              type="text"
              placeholder='Wpisz swój tekst'
              value={textContent.list}
            />
          )
        }
        case 'p': {
          return (
            <textarea
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 resize-none h-60 border-2 rounded-xl"
              type="text"
              placeholder='Wpisz swój tekst'
              value={textContent.text}
            />
          )
        }
        case 'img': {
          const sendImage = async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append('file', file);

            await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData)
              .then(res => {
                setTextContent(() => {
                  return {
                    ...textContent,
                    image: res.data.path,
                    alt: res.data.name
                  };
                });

                article.content.map(item => {
                  if (item.id === id) {
                    item.alt = res.data.name;
                    item.image = res.data.path;
                  }
                })
              })
              .catch(err => console.log('нет картинки'));
          }
          return (
            <div
              className='flex flex-col items-center p-2 max-w-xs mx-auto'
            >
              <p className="text-xl text-center mb-3">Twój obraz</p>
              <RenderImage imageSource={textContent.image} />
              <div className="flex flex-col items-center gap-2 p-2 max-w-xs mx-auto">
                <p className="text-center">Jeśli chcesz zmienić, powtórz.</p>
                <div className="relative flex flex-col justify-center items-center w-48 mx-auto h-24  p-3 bg-blue-100 hover:bg-blue-300 rounded-xl transition">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                    onChange={e => { setFile(e.target.files[0]); }}
                  />
                  <img src={picture} alt="capt" className="w-8" />
                </div>
                <button
                  className="inline-block p-2 rounded-md transition bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white"
                  onClick={(e) => { sendImage(e); }}
                >
                  wyślij
                </button>
              </div>
            </div>
          )
        }
        case 'iframe': {
          return (
            <input
              onChange={changeText}
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700  border-2 rounded-xl"
              type="text"
              placeholder='Wpisz swój tekst'
              value={textContent.text}
            />
          )
        }
        case 'code': {
          return (
            <div className="">
              <textarea
                onChange={changeText}
                onKeyDown={onKeyDown}
                ref={tagRef}
                className="w-full p-2 outline-blue-700 resize-none  h-60 border-2 rounded-xl"
                type="text"
                placeholder='skopiuj swój kod i wklej tutaj'
                value={textContent.text}
              />
              <input
                onChange={changeText}
                onKeyDown={onKeyDown}
                ref={tagRef}
                name="language"
                type="text"
                className="w-full p-2 outline-blue-700  border-2 rounded-xl"
                placeholder="napisz język, w którym napisany jest kod (javascript, C / C++, python itp.)"
                value={textContent.language || ''}
              />
            </div>
          )
        }
        default: {
          return undefined;
        }
      }
    }
  }

  return (
    <>
      {determine()}
    </>
  )
};

export default NewTagForEdit;