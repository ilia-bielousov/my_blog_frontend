import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import picture from './../../../assets/images/picture.svg';

const NewTag = ({ tag, IDforElementOfArticle }) => {
  const content = useSelector(state => state.admin.creatingArticle.previewElements);
  const classes = useSelector(state => state.admin.creatingArticle.currentStyleClassText);
  const tagRef = useRef(null);
  const [file, setFile] = useState('');

  // для фокуса после создания.
  useEffect(() => {
    if (tag !== 'img') tagRef.current.focus();
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && tag !== 'ul') {
      tagRef.current.blur();
      content[IDforElementOfArticle].text = e.target.value;
      content[IDforElementOfArticle].className = classes;
    }
  };

  const determine = () => {
    switch (tag) {
      case 'h1': {
        return (
          <div className="">
            <input
              ref={tagRef}
              className="w-full p-2 outline-blue-700 mb-2"
              type="text"
              onKeyDown={onKeyDown}
              placeholder='Введите свой текст'
            // нужно добавить value и как-то туда записывать текст или ссылку на картинку и тд
            />
          </div>
        )
      }
      case 'h2': {
        return (
          <div className="">
            <input
              ref={tagRef}
              className="w-full p-2 outline-blue-700 mb-2"
              type="text"
              onKeyDown={onKeyDown}
              placeholder='Введите свой текст'
            />
          </div>
        )
      }
      case 'h3': {
        return (
          <div className="">
            <input
              ref={tagRef}
              className="w-full p-2 outline-blue-700 mb-2"
              type="text"
              onKeyDown={onKeyDown}
              placeholder='Введите свой текст'
            />
          </div>
        )
      }
      case 'ul': {
        return (
          <div className="">
            <input
              ref={tagRef}
              className="w-full p-2 outline-blue-700 mb-2"
              type="text"
              onKeyDown={onKeyDown}
              placeholder='Введите свой текст'
            />
            {/* тут нужно поработать со списком (возможно еще с ссыками) */}
            <div className="">
              <li>
                <input onKeyDown={onKeyDown} className="p-2 outline-none" type="text" placeholder='Введите свой текст' />
              </li>
            </div>
          </div>
        )
      }
      case 'p': {
        return (
          <div className="">
            <textarea
              onKeyDown={onKeyDown}
              ref={tagRef}
              className="w-full p-2 outline-blue-700 resize-none mb-2 h-48"
              type="text"
              placeholder='Введите свой текст'
            />
          </div>
        )
      }
      case 'img': {
        const sendImage = async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append('file', file);

          await axios.post('http://localhost:4000/admin/upload', formData)
            .then(res => {
              content[IDforElementOfArticle] = { ...content[IDforElementOfArticle], alt: res.data.name, image: `http://localhost:4000${res.data.path}`, id: IDforElementOfArticle }

              // console.log(res);
            })
            .catch(err => console.log(err));
        }

        return (
          <div className="flex flex-col items-center p-2 max-w-xs mx-auto">
            <div className="relative flex flex-col justify-center items-center w-48 mx-auto h-24 p-3 mb-2 bg-blue-100 hover:bg-blue-300 rounded-xl transition">
              <input
                type="file"
                className="w-full h-full absolute inset-0 opacity-0 cursor-pointer"
                onChange={e => setFile(e.target.files[0])}
              />
              <img src={picture} alt="capt" className="w-8" />
            </div>
            <button
              className="inline-block p-2 rounded-md transition bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white"
              onClick={(e) => sendImage(e)}
            >
              confirm
            </button>
          </div>
        )
      }
      case 'code': {
        return (
          <code ref={tagRef} className=''></code>
        )
      }

      default: {

      }
    }
  }

  return (
    <>
      {determine()}
    </>
  )
}

export default NewTag;