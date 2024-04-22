import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { updateReviewContentAnArticle } from "../../../store/adminActions";

import picture from './../../../assets/images/picture.svg';

const NewTag = ({ tag, IDforElementOfArticle }) => { // неправильная логика IDforElementOf...
  const dispatch = useDispatch();
  const content = useSelector(state => state.admin.creatingArticle.previewElements);
  const deletedElement = useSelector(state => state.admin.creatingArticle.deletedCompontentId);

  const tagRef = useRef(null);

  const [file, setFile] = useState('');
  const [sourceImg, setSourceImg] = useState(null);
  const [idElem, setIdElem] = useState(IDforElementOfArticle);

  useEffect(() => {
    if (tag !== 'img') {
      tagRef.current.focus();
    }

    if (tag === 'code') {
      tagRef.current.children[0].focus();
    }
  }, []);

  // useEffect(() => {
  //   setIdElem((prev) => prev);

  // }, [deletedElement]);

  const onKeyDown = (e) => { // неправильная логика
    if (e.key === 'Enter' && tag !== 'ul' && tag !== 'code') {
      tagRef.current.blur();

      if (tag === 'p') {
        content[idElem].className = `text-justify indent-12 mb-3`;
      } else if (tag === 'h1') {
        content[idElem].className = `text-3xl font-bold mb-5`;
      } else if (tag === 'h2') {
        content[idElem].className = `text-2xl font-bold mb-4`;
      } else if (tag === 'h3') {
        content[idElem].className = `text-xl mb-3`;
      }

    } else if (tag === 'ul' && e.key === 'Control') {
      tagRef.current.blur();
      content[idElem].list = e.target.value;
    } else if (e.key === 'Enter' && tag === 'code') {
      content[idElem].text = tagRef.current.children[0].value;
      content[idElem].language = tagRef.current.children[1].value;

      tagRef.current.children[0].blur();
      tagRef.current.children[1].blur();
    }

    content[idElem].text = e.target.value;

    dispatch(updateReviewContentAnArticle(content));
  };

  const determine = () => {
    // возможно добавить цитату
    switch (tag) {
      case 'h1': {
        return (
          <input // возможно еще тут переписать, добавить редактирование
            ref={tagRef}
            className="input__newTag"
            type="text"
            onKeyDown={onKeyDown}
            placeholder='Введите свой текст'
          // value={value ? value : null}
          />
        )
      }
      case 'h2': {
        return (
          <input
            ref={tagRef}
            className="input__newTag"
            type="text"
            onKeyDown={onKeyDown}
            placeholder='Введите свой текст'
          />
        )
      }
      case 'h3': {
        return (
          <input
            ref={tagRef}
            className="input__newTag"
            type="text"
            onKeyDown={onKeyDown}
            placeholder='Введите свой текст'
          />
        )
      }
      case 'ul': {
        return (
          <textarea
            onKeyDown={onKeyDown}
            ref={tagRef}
            className="input__newTag input__newTag-resize"
            type="text"
            placeholder='Введите свой текст'
          />
        )
      }
      case 'p': {
        return (
          <textarea
            onKeyDown={onKeyDown}
            ref={tagRef}
            className="input__newTag input__newTag-resize"
            type="text"
            placeholder='Введите свой текст'
          />
        )
      }
      case 'img': { // добавить подпись для картинки
        const sendImage = async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append('file', file);

          await axios.post('http://localhost:4000/admin/upload', formData)
            .then(res => {
              content[IDforElementOfArticle] = { ...content[IDforElementOfArticle], alt: res.data.name, image: `http://localhost:4000${res.data.path}`, id: IDforElementOfArticle, className: 'mx-auto p-3' }
              setSourceImg(`http://localhost:4000${res.data.path}`);
            })
            .catch(err => console.log(err));
        }

        return (
          <>
            {(!sourceImg ?
              <div className="flex flex-col items-center p-2 max-w-xs mx-auto">
                <div className="relative flex flex-col justify-center items-center w-48 mx-auto h-24 mb-2 p-3 bg-blue-100 hover:bg-blue-300 rounded-xl transition">
                  <input
                    type="file"
                    name="image"
                    id="image"
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
              </div> :
              <div className="mx-auto">
                <p className="text-xl text-center mb-3">Ваше изображение</p>
                <img className="mx-auto px-3" src={sourceImg} alt="test" />
                <div className="flex flex-col items-center p-2 max-w-xs mx-auto">
                  <p className="text-center mb-3">Eсли хотите изменить, повторите.</p>
                  <div className="relative flex flex-col justify-center items-center w-48 mx-auto h-24 mb-2 p-3 bg-blue-100 hover:bg-blue-300 rounded-xl transition">
                    <input
                      type="file"
                      name="image"
                      id="image"
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
              </div>)}
          </>
        )
      }
      case 'iframe': {
        return (
          <div className="w-full">
            <p className="mb-3">Чтобы вставить видео, скопируйте ссылку и вставьте в поле ниже.</p>
            <input
              ref={tagRef}
              className="input__newTag"
              type="text"
              onKeyDown={onKeyDown}
              placeholder='Введите свой текст'
            />
          </div>
        )
      }
      case 'code': {
        return (
          // проблема в tagRef когда я записываю язык на котором написано
          <div className="w-full"
            ref={tagRef}>
            <textarea
              onKeyDown={onKeyDown}
              className="input__newTag input__newTag-resize mb-2"
              type="text"
              placeholder='скопируйте свой код и вставьте сюда'
            />
            <input
              onKeyDown={onKeyDown}
              type="text"
              className="input__newTag"
              placeholder="напишите язык на каком написан код (javascript, c/c++, python etc.)"
            />
          </div>
        )
      }
      default: {
        return undefined;
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