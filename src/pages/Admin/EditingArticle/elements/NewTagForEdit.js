import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { RenderImage } from "../../../../utilities/utilities";

import picture from './../../../../assets/images/picture.svg';

const NewTagForEdit = ({ tag, text, id, className, list, language, article, image, alt }) => {
  const [textContent, setTextContent] = useState({});
  const [file, setFile] = useState('');
  const [classesForBorderTagTop, setClassesForBorderTagTop] = useState('w-full h-1/2 absolute top-0 left-0 z-10');
  const [classesForBorderTagBottom, setClassesForBorderTagBottom] = useState('w-full h-1/2 absolute bottom-0 left-0 z-10');
  const statusClickPanelTags = useSelector(state => state.admin.creatingArticle.statusClickPanelTags);
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);

  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const tagRef = useRef();
  const textTags = ['h1', 'h2', 'h3', 'p', 'code', 'iframe'];
  const commonProps = {
    ref: tagRef,
    className: 'input__newTag',
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: (e) => {
      if (!article?.content) return; // защита
      article.content.forEach((item) => {
        if (item.id === id && textTags.includes(tag)) {
          item.text = e.target.textContent;
        } else if (item.id === id && item.tag === 'ul') {
          item.list = e.target.textContent;
        }
      });
    },
  };

  useEffect(() => {
    setTextContent({ tag, text, id, className, list, language, article, image, alt });

    console.log(article);

  }, [tagRef, tag, text, id, className, list, language, article, image, alt]);

  const inputCode = () => {
    article.content.map(item => {
      if (item.id === id) {
        item.text = tagRef.current.children[0].value;
        item.language = tagRef.current.children[1].value;
      }
    });
  }

  const determine = () => {
    switch (textContent.tag) {
      case 'h1': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}>{textContent.text}</div>
      case 'h2': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}>{textContent.text}</div>
      case 'h3': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}>{textContent.text}</div>
      case 'ul': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}>{textContent.list}</div>
      case 'p': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}>{textContent.text}</div>
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
            <p className="text-xl text-center mb-3">Твоя картинка</p>
            <RenderImage imageSource={textContent.image} />
            <div className="flex flex-col items-center gap-2 p-2 max-w-xs mx-auto">
              <p className="text-center">Если вы хотите изменить, повторите.</p>
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
                подтвердить
              </button>
            </div>
          </div>
        )
      }
      case 'iframe': return <div {...commonProps} className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}>{textContent.text}</div>
      case 'code':
        return (
          <div ref={tagRef}>
            <textarea onInput={inputCode} placeholder="скопируйте свой код" type="text" className='input__newTag input__newTag-resize mb-2' defaultValue={textContent.text}></textarea>
            <input onInput={inputCode} placeholder="укажите язык на котором написан код" type="text" className='input__newTag' defaultValue={textContent.language} />
          </div>
        )
      default: {
        return null;
      }
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

    console.log('test');
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
};

export default NewTagForEdit;