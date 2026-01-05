import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { updateReviewContentAnArticle } from "../../../../store/adminActions";

// Можно использовать иконку из heroicons для загрузки, если picture.svg не подходит по стилю
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

  const textTags = ['h1', 'h2', 'h3', 'p', 'iframe', 'ul'];

  // --- СТИЛИ ДЛЯ "НЕВИДИМЫХ" ИНПУТОВ ---
  // Базовый стиль: без рамки, прозрачный фон, плавный цвет текста
  const baseStyle = "w-full outline-none bg-transparent transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 cursor-text";

  const tagStyles = {
    h1: `${baseStyle} text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight`,
    h2: `${baseStyle} text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3`,
    h3: `${baseStyle} text-xl font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2`,
    p: `${baseStyle} text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-2 min-h-[1.5em]`,
    ul: `${baseStyle} list-disc list-inside text-lg text-slate-700 dark:text-slate-300 mb-2 pl-4`,
    iframe: `${baseStyle} font-mono text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded text-slate-600`,
  };

  const placeholders = {
    h1: "Заголовок 1 уровня...",
    h2: "Заголовок 2 уровня...",
    h3: "Заголовок 3 уровня...",
    p: "Начните писать текст...",
    ul: "Элемент списка...",
    iframe: "Вставьте ссылку на iframe...",
  };

  const commonProps = {
    ref: tagRef,
    // Применяем стиль в зависимости от тега
    className: tagStyles[tag] || tagStyles.p,
    contentEditable: true,
    suppressContentEditableWarning: true,
    "data-placeholder": placeholders[tag] || "Текст...", // Для CSS placeholder
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
    // Убираем focus='true' из пропов DOM, делаем это через useEffect
  };

  useEffect(() => {
    setIdElem(IDforElementOfArticle);

    // Фокус только при создании, если это текстовый блок
    if (tagRef.current && tag !== 'img' && tag !== 'code') {
      // Небольшой таймаут, чтобы DOM успел отрисоваться
      setTimeout(() => tagRef.current.focus(), 0);
    }
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
    // Для текстовых тегов логика одинаковая, отличаются только стили (в commonProps)
    if (textTags.includes(tag)) {
      return (
        <div
          {...commonProps}
          className={`${commonProps.className} ${!statusClickPanelTags ? 'relative z-30' : ''}`}
        />
      );
    }

    switch (tag) {
      case 'img': {
        const sendImage = async (e) => {
          if (e) e.preventDefault(); // Защита если вызываем не по кнопке
          if (!file) return;

          const formData = new FormData();
          formData.append('file', file);

          await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData)
            .then(res => {
              content.map(item => {
                if (item.id === idElem) {
                  item.alt = res.data.name;
                  item.image = res.data.path;
                  item.className = 'mx-auto p-3 rounded-lg shadow-sm'; // Добавил стилей картинке
                }
              });
              // setSourceImg(`${process.env.REACT_APP_API_URL}${res.data.path}`);
              console.log(res.data.path);
              setSourceImg(res.data.path);
              dispatch(updateReviewContentAnArticle(content));
            })
            .catch(err => { console.log('Ошибка загрузки') });
        }

        return (
          <div className={`relative ${!statusClickPanelTags ? 'z-30' : ''} my-4`}>
            {!sourceImg ? (
              // --- СТИЛЬ ЗАГРУЗЧИКА (Dashed Border) ---
              <div className="group relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-48 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all bg-slate-50 dark:bg-slate-900">

                <div className="flex flex-col items-center pointer-events-none">
                  <img src={picture} alt="upload" className="w-10 h-10 mb-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Нажмите или перетащите изображение</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP</p>
                </div>

                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={e => {
                    const selectedFile = e.target.files[0];
                    setFile(selectedFile);
                    // Можно сразу отправлять, если хочешь автоматику:
                    // if(selectedFile) sendImage(null); 
                  }}
                />

                {/* Кнопка отправки появляется только если файл выбран */}
                {file && (
                  <button
                    className="absolute bottom-4 z-20 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow hover:bg-blue-700 transition"
                    onClick={(e) => sendImage(e)}
                  >
                    Загрузить {file.name.slice(0, 15)}...
                  </button>
                )}
              </div>
            ) : (
              // --- СТИЛЬ УЖЕ ЗАГРУЖЕННОЙ КАРТИНКИ ---
              <div className="relative group max-w-3xl mx-auto">
                <img className="w-full h-auto rounded-lg shadow-md" src={sourceImg} alt="uploaded" />

                {/* Оверлей для изменения картинки */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <label className="cursor-pointer px-4 py-2 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition">
                    Изменить изображение
                    <input
                      type="file"
                      className="hidden"
                      onChange={e => { setFile(e.target.files[0]); setSourceImg(null); }}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        )
      }

      case 'code': {
        return (
          <div ref={tagRef} className={`my-4 relative group ${!statusClickPanelTags ? 'z-30' : ''}`}>
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-slate-700">
              {/* Верхняя панель (язык) */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <input
                  onInput={inputCode}
                  placeholder="Язык (js, py...)"
                  type="text"
                  className="bg-transparent text-right text-xs text-slate-400 placeholder:text-slate-600 outline-none w-20 uppercase font-mono"
                />
              </div>

              {/* Поле кода */}
              <textarea
                onInput={inputCode}
                placeholder="// Вставьте ваш код сюда..."
                className="w-full min-h-[120px] p-4 bg-slate-800 text-slate-200 font-mono text-sm outline-none resize-y border-none block"
                spellCheck="false"
              ></textarea>
            </div>
          </div>
        )
      }
      default: return null;
    }
  }

  // --- DRAG AND DROP ЛОГИКА (БЕЗ ИЗМЕНЕНИЙ) ---
  const handleDragOverBlock = (e) => {
    e.preventDefault();
    if (e.target === topRef.current && currentTagButton)
      setClassesForBorderTagTop('w-full h-1/2 absolute top-0 left-0 z-10 border-t-4 rounded border-blue-500 opacity-50') // Поменял на синий для красоты
    if (e.target === bottomRef.current && currentTagButton)
      setClassesForBorderTagBottom('w-full h-1/2 absolute bottom-0 left-0 z-10 border-b-4 rounded border-blue-500 opacity-50')
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
        className={`relative transition-all duration-200 ${statusClickPanelTags ? 'border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-1 my-1' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-lg -mx-2 px-2'}`}
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