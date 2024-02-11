import { useEffect, useRef, useState } from "react";
import axios from "axios";

import picture from './../../../assets/images/picture.svg';

const NewTag = ({ tag, text }) => {
  const tagRef = useRef(null);
  const [file, setFile] = useState('');

  // для фокуса после создания.
  useEffect(() => {
    if (tag !== 'img') tagRef.current.focus();
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && tag !== 'ul') {
      tagRef.current.blur();
    } else {
      // console.log(tagRef.current.outerText) // здесь нужно решить проблему, если удалили текст, то стэйт не обновляется
      // setTextInTag(`${tagRef.current.outerText}${e.key === 1 ? e.key : ''}`);
    }
  };


  const determine = () => {
    switch (tag) {
      case 'h1': {
        return (
          <div className="">
            <input onKeyDown={onKeyDown} ref={tagRef} className="w-full p-2 outline-blue-700 mb-2" type="text" placeholder={text} />
          </div>
        )
      }
      case 'h2': {
        return (
          <div className="">
            <input onKeyDown={onKeyDown} ref={tagRef} className="w-full p-2 outline-blue-700 mb-2" type="text" placeholder={text} />
          </div>
        )
      }
      case 'h3': {
        return (
          <div className="">
            <input onKeyDown={onKeyDown} ref={tagRef} className="w-full p-2 outline-blue-700 mb-2" type="text" placeholder={text} />
          </div>
        )
      }
      case 'ul': {
        return (
          <div className="">
            <input onKeyDown={onKeyDown} ref={tagRef} className="w-full p-2 outline-none" type="text" placeholder={text} />
            {/* тут нужно поработать со списком (возможно еще с ссыками) */}
            <div className="">
              <li>
                <input onKeyDown={onKeyDown} className="p-2 outline-none" type="text" placeholder={text} />
              </li>
            </div>
          </div>
        )
      }
      case 'p': {
        return (
          <div className="">
            <textarea ref={tagRef} className="w-full p-2 outline-blue-700 resize-none mb-2 h-48" type="text" placeholder={text} />
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
              // content = { ...content, alt: res.data.name, image: `http://localhost:4000${res.data.path}` };
              console.log(res);
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
              {/* <div className="text-white py-2 px-4 rounded-md flex justify-center h-full items-center"> */}
              <img src={picture} alt="capt" className="w-8" />
            </div>
            <button
              className="inline-block p-2 rounded-md bg-blue-700 text-white"
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