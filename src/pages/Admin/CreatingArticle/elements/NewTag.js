import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { updateReviewContentAnArticle } from "../../../../store/adminActions";

import picture from './../../../../assets/images/picture.svg';

const NewTag = ({ tag, IDforElementOfArticle }) => {
  const dispatch = useDispatch();
  let content = useSelector(state => state.admin.creatingArticle.previewElements);
  const statusClickPanelTags = useSelector(state => state.admin.creatingArticle.statusClickPanelTags);
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);

  const tagRef = useRef(null);

  const [file, setFile] = useState('');
  const [sourceImg, setSourceImg] = useState(null);
  const [idElem, setIdElem] = useState(null);

  const [classesForBorderTagTop, setClassesForBorderTagTop] = useState('w-full h-1/2 absolute top-0 left-0 z-10');
  const [classesForBorderTagBottom, setClassesForBorderTagBottom] = useState('w-full h-1/2 absolute bottom-0 left-0 z-10');

  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const textTags = ['h1', 'h2', 'h3', 'p', 'iframe'];
  const commonProps = {
    ref: tagRef,
    className: 'input__newTag',
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: (e) => {
      content.forEach((item) => {
        if (item.id === idElem && textTags.includes(tag)) {
          item.text = e.target.textContent;
        } else if (item.id === idElem && tag === 'code') {
          item.code = e.target.textContent;
        }
        else if (item.id === idElem && tag === 'ul') {
          item.list = e.target.textContent;
        }
      });
      dispatch(updateReviewContentAnArticle(content));
    },
    focus: 'true'
  };

  useEffect(() => {
    setIdElem(IDforElementOfArticle);

    if (commonProps.focus && tag !== 'img' && tag !== 'code')
      tagRef.current.focus();

  }, []);

  const inputCode = () => {
    content.map(item => {
      if (item.id === idElem) {
        item.text = tagRef.current.children[0].value;
        item.language = tagRef.current.children[1].value;
      }
    });

    dispatch(updateReviewContentAnArticle(content));
  }

  const determine = () => {
    switch (tag) {
      case 'h1': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'} />
      case 'h2': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'} />
      case 'h3': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'} />
      case 'ul': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'} />
      case 'p': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'} />
      case 'img': {
        const sendImage = async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append('file', file);

          await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData)
            .then(res => {
              content.map(item => {
                if (item.id === idElem) {
                  item.alt = res.data.name;
                  item.image = res.data.path;
                  item.className = 'mx-auto p-3';
                }
              });
              setSourceImg(`${process.env.REACT_APP_API_URL}${res.data.path}`);
              dispatch(updateReviewContentAnArticle(content));
            })
            .catch(err => { console.log('нет изображения') }); // возможно добавить модальное окно
        }

        return (
          <>
            {(!sourceImg ?
              <div
                className={!statusClickPanelTags ? 'flex flex-col items-center p-2 max-w-xs mx-auto relative z-30' : 'flex flex-col items-center p-2 max-w-xs mx-auto'}
              >
                <div className="relative flex flex-col justify-center items-center w-48 mx-auto h-24 mb-2 p-3 bg-blue-100 hover:bg-blue-300 rounded-xl transition">
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
                  отправить
                </button>
              </div> :
              <div
                className={!statusClickPanelTags ? 'flex flex-col items-center p-2 max-w-xs mx-auto relative z-30' : 'flex flex-col items-center p-2 max-w-xs mx-auto'}
              >
                <p className="text-xl text-center mb-3 font-semibold">Ваше изображение</p>
                <img className="mx-auto px-3" src={sourceImg} alt="test" />
                <div className="flex flex-col items-center p-2 max-w-xs mx-auto">
                  <p className="text-center mb-3">Если вы хотите изменить, повторите.</p>
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
                    отправить
                  </button>
                </div>
              </div>)}
          </>
        )
      }
      case 'iframe': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'} />
      case 'code': {
        return (
          <div ref={tagRef}>
            <textarea onInput={inputCode} placeholder="скопируйте свой код" type="text" className={!statusClickPanelTags ? 'input__newTag input__newTag-resize relative z-30 mb-2' : 'input__newTag input__newTag-resize mb-2'}></textarea>
            <input onInput={inputCode} placeholder="укажите язык на котором написан код" type="text" className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}></input>
          </div>
        )
      }
      default: return null;
    }
  }

  const handleDragOverBlock = (e) => {
    e.preventDefault();

    if (e.target === topRef.current && currentTagButton)
      setClassesForBorderTagTop('w-full h-1/2 absolute top-0 left-0 z-10 border-t-4 rounded border-red-600')

    if (e.target === bottomRef.current && currentTagButton)
      setClassesForBorderTagBottom('w-full h-1/2 absolute bottom-0 left-0 z-10 border-b-4 rounded border-red-600')
  };

  const handleDragEnd = (e) => {
    e.preventDefault();

    setClassesForBorderTagTop('w-full h-1/2 absolute top-0 left-0 z-10')
    setClassesForBorderTagBottom('w-full h-1/2 absolute bottom-0 left-0 z-10')
  }

  const handleDrop = (e) => {
    setClassesForBorderTagTop('w-full h-1/2 absolute top-0 left-0 z-10')
    setClassesForBorderTagBottom('w-full h-1/2 absolute bottom-0 left-0 z-10')
  }

  return (
    <>
      <div
        className={statusClickPanelTags ? 'border-[1px] rounded border-red-900' : ''}
        onDragLeave={(e) => handleDragEnd(e)}
        onDragOver={(e) => handleDragOverBlock(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <div
          ref={topRef}
          data-position='top'
          className={`${classesForBorderTagTop}`}
        >
        </div>
        {determine()}
        <div
          ref={bottomRef}
          className={`${classesForBorderTagBottom}`}
          data-position='bottom'
        >
        </div>
      </div>
    </>
  )
}

export default NewTag;
