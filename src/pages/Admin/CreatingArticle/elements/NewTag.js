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
  const [statusInputTag, setStatusInputTag] = useState(true);

  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    setIdElem(IDforElementOfArticle);

    if (tag !== 'img') {
      tagRef.current.focus();
    }

    if (tag === 'code && tagRef.current') {
      tagRef.current.children[0].focus();
    }

  }, []);

  useEffect(() => {

  }, [content])

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && tag !== 'ul' && tag !== 'code') {
      tagRef.current.blur();

      if (tag === 'p') {
        content.map(item => {
          if (item.id === idElem) {
            item.className = 'text-justify indent-12 mb-3';
          }
        });
      } else if (tag === 'h1') {
        content.map(item => {
          if (item.id === idElem) {
            item.className = 'text-3xl font-bold mb-5 max-md:text-2xl';
          }
        });
      } else if (tag === 'h2') {
        content.map(item => {
          if (item.id === idElem) {
            item.className = 'text-2xl font-bold mb-4 max-md:text-xl';
          }
        });
      } else if (tag === 'h3') {
        content.map(item => {
          if (item.id === idElem) {
            item.className = 'text-xl mb-3 max-md:text-lg';
          }
        });
      }

    } else if (tag === 'ul' && e.key === 'Control') {
      tagRef.current.blur();

      content.map(item => {
        if (item.id === idElem) {
          item.list = e.target.value;
        }
      });
    } else if (e.key === 'Enter' && tag === 'code') {
      tagRef.current.children[0].blur();
      tagRef.current.children[1].blur();
    }

    if (e.key === 'Enter' || e.key === 'Control')
      setStatusInputTag(false);

    content.map(item => {
      if (item.id === idElem && tag !== 'iframe') {
        item.text = e.target.value;
      }

      if (item.id === idElem && tag === 'iframe') {
        const t = e.target.value.split(' ');
        t[1] = 'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"';
        t[2] = ' ';

        item.text = t.join(' ');
      }

      if (item.id === idElem && tag === 'code') {
        item.text = tagRef.current.children[0].value;
        item.language = tagRef.current.children[1].value;
      }
    });

    dispatch(updateReviewContentAnArticle(content));
  };

  const test = (e) => {
    console.log(e.target.textContent);
  }

  const determine = () => {
    switch (tag) {
      case 'h1': {
        // return (
        //   <input
        //     ref={tagRef}
        //     className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}
        //     type="text"
        //     onKeyDown={onKeyDown}
        //     placeholder='Wpisz swój tekst'
        //   />
        // )
        return (
          <div
            ref={tagRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={test}
            className="relative z-20"
          >
          </div>
        )
      }
      case 'h2': {
        return (
          <input
            ref={tagRef}
            className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}
            type="text"
            onKeyDown={onKeyDown}
            placeholder='Wpisz swój tekst'
          />
        )
      }
      case 'h3': {
        return (
          <input
            ref={tagRef}
            className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}
            type="text"
            onKeyDown={onKeyDown}
            placeholder='Wpisz swój tekst'
          />
        )
      }
      case 'ul': {
        return (
          <textarea
            onKeyDown={onKeyDown}
            ref={tagRef}
            className={!statusClickPanelTags ? 'input__newTag input__newTag-resize relative z-30' : 'input__newTag input__newTag-resize'}
            type="text"
            placeholder='Wpisz swój tekst'
          />
        )
      }
      case 'p': {
        return (
          <textarea
            onKeyDown={onKeyDown}
            ref={tagRef}
            className={!statusClickPanelTags ? 'input__newTag input__newTag-resize relative z-30 h-full' : 'input__newTag input__newTag-resize'}
            type="text"
            placeholder='Wpisz swój tekst'
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
            .catch(err => console.log('brak obrazu :('));
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
                  onClick={(e) => { sendImage(e); setStatusInputTag(false); }}
                >
                  wyślij
                </button>
              </div> :
              <div
                className={!statusClickPanelTags ? 'flex flex-col items-center p-2 max-w-xs mx-auto relative z-30' : 'flex flex-col items-center p-2 max-w-xs mx-auto'}
              >
                <p className="text-xl text-center mb-3 font-semibold">Twój obraz</p>
                <img className="mx-auto px-3" src={sourceImg} alt="test" />
                <div className="flex flex-col items-center p-2 max-w-xs mx-auto">
                  <p className="text-center mb-3">Jeśli chcesz zmienić, powtórz.</p>
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
                    wyślij
                  </button>
                </div>
              </div>)}
          </>
        )
      }
      case 'iframe': {
        return (
          <div className="w-full">
            <p className="p-2">Aby wkleić film, skopiuj link i wklej w polu poniżej.</p>
            <input
              ref={tagRef}
              className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}
              type="text"
              onKeyDown={onKeyDown}
              placeholder='Wpisz swój tekst'
            />
          </div>
        )
      }
      case 'code': {
        return (
          <div className="w-full"
            ref={tagRef}>
            <textarea
              onKeyDown={onKeyDown}
              className={!statusClickPanelTags ? 'input__newTag input__newTag-resize relative z-30 border' : 'input__newTag input__newTag-resize'}
              type="text"
              placeholder='skopiuj swój kod i wklej tutaj'
            />
            <input
              onKeyDown={onKeyDown}
              type="text"
              className={!statusClickPanelTags ? 'input__newTag relative z-30' : 'input__newTag'}
              placeholder="napisz język, w którym napisany jest kod (javascript, C / C++, python itp.)"
            />
          </div>
        )
      }
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
  }

  return (
    <div
      className={statusClickPanelTags ? 'border-[1px] rounded border-red-900' : ''}
      onDragLeave={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOverBlock(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <div
        ref={topRef}
        className={`${classesForBorderTagTop}`}
        data-position='top'
      >
      </div>
      <div className={statusInputTag ? 'border-2 rounded border-red-600' : 'border-2 rounded'}>
        {determine()}
      </div>
      <div
        ref={bottomRef}
        className={`${classesForBorderTagBottom}`}
        data-position='bottom'
      >
      </div>
    </div>
  )
}

export default NewTag;