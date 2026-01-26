import { useEffect, useRef, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// Единый экшен обновления
import { updateReviewContentAnArticle } from "../../../../store/adminActions";
import picture from './../../../../assets/images/picture.svg';

const NewTag = (props) => {
  const { tag, IDforElementOfArticle, text, image, alt, list, code, language, url } = props;

  const dispatch = useDispatch();
  const [localUrl, setLocalUrl] = useState(url || '');

  // Синхронизация URL если пропсы изменились извне
  useEffect(() => {
    setLocalUrl(url || '');
  }, [url]);

  // Получаем ВЕСЬ массив контента, чтобы обновить нужный элемент
  const fullContent = useSelector(state => state.admin.creatingArticle.previewElements);

  const statusClickPanelTags = useSelector(state => state.admin.creatingArticle.statusClickPanelTags);
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);

  // --- ЛОКАЛЬНЫЙ СТЕЙТ ДЛЯ ИСПРАВЛЕНИЯ БАГОВ ВВОДА ---
  const [localText, setLocalText] = useState(text || '');
  const [localCode, setLocalCode] = useState(code || '');
  const [localLang, setLocalLang] = useState(language || '');
  // ---------------------------------------------------

  const [file, setFile] = useState('');
  const [sourceImg, setSourceImg] = useState(image || null);

  const tagRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  // Стили для DragOver
  const [classesForBorderTagTop, setClassesForBorderTagTop] = useState('w-full h-1/2 absolute top-0 left-0 z-10');
  const [classesForBorderTagBottom, setClassesForBorderTagBottom] = useState('w-full h-1/2 absolute bottom-0 left-0 z-10');

  // Синхронизация: Если пропсы изменились извне (например, при первой загрузке), обновляем локальный стейт
  useEffect(() => {
    setLocalText(text || '');
    setLocalCode(code || '');
    setLocalLang(language || '');
    setSourceImg(image || null);
  }, [text, code, language, image]);


  // --- ФУНКЦИЯ ОБНОВЛЕНИЯ REDUX (вызывается onBlur) ---
  const handleUpdate = (field, value) => {
    // Создаем новый массив с обновленным элементом
    const updatedContent = fullContent.map(item => {
      if (item.id === IDforElementOfArticle) {
        return { ...item, [field]: value };
      }
      return item;
    });
    dispatch(updateReviewContentAnArticle(updatedContent));
  };


  // --- СТИЛИ ---
  const baseStyle = "w-full outline-none bg-transparent transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-slate-300 cursor-text py-1";
  const tagStyles = {
    h1: `${baseStyle} text-4xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight`,
    h2: `${baseStyle} text-2xl font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2`,
    h3: `${baseStyle} text-xl font-semibold text-slate-800 dark:text-slate-200 mt-2 mb-1`,
    p: `${baseStyle} text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-2 min-h-[1.5em]`,
    ul: `${baseStyle} list-disc list-inside text-lg text-slate-700 dark:text-slate-300 mb-2 pl-4`,
    iframe: `${baseStyle} font-mono text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded text-slate-600 border border-slate-200 dark:border-slate-700`,
  };

  const placeholders = {
    h1: "Заголовок 1 уровня",
    h2: "Заголовок 2 уровня",
    h3: "Заголовок 3 уровня",
    p: "Начните писать текст...",
    ul: "Элемент списка",
    iframe: "Вставьте <iframe src=...></iframe>",
  };

  // --- РЕНДЕР ТЕКСТОВЫХ БЛОКОВ ---
  const renderTextBlock = () => {
    return (
      <Fragment>
        <div
          ref={tagRef}
          className={`${tagStyles[tag] || tagStyles.p} ${!statusClickPanelTags ? 'relative z-30' : ''}`}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholders[tag]}

          // ВАЖНО: onInput обновляет только локальный стейт (быстро)
          onInput={(e) => setLocalText(e.target.innerText)}

          // ВАЖНО: onBlur отправляет данные в Redux (надежно)
          onBlur={(e) => handleUpdate(tag === 'ul' ? 'list' : 'text', e.target.innerText)}
        >
          {/* Используем dangerouslySetInnerHTML или children, но для contentEditable лучше так: */}
          {text || list}
        </div>
        {tag === 'ul' && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Каждый пункт списка пиши с новой строки
          </p>
        )}
      </Fragment>
    );
  };


  // --- ГЛАВНЫЙ RENDER SWITCH ---
  const determine = () => {
    if (['h1', 'h2', 'h3', 'p', 'iframe', 'ul', 'blockquote'].includes(tag)) {
      return renderTextBlock();
    }

    switch (tag) {
      case 'btn': {
        return (
          <div className={`my-4 relative ${!statusClickPanelTags ? 'z-30' : ''}`}>
            <input
              type="text"
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              onBlur={(e) => handleUpdate('text', e.target.value)}
              placeholder="Текст кнопки"
              className="w-full p-2 border border-slate-300 rounded mb-2"
            />
            <input
              type="url"
              value={localUrl}
              onChange={(e) => setLocalUrl(e.target.value)}
              onBlur={(e) => handleUpdate('url', e.target.value)}
              placeholder="Ссылка для кнопки"
              className="w-full p-2 border border-slate-300 rounded"
            />
          </div>
        );
      }
      case 'img': {
        const sendImage = async (e) => {
          if (e) e.preventDefault();
          if (!file) return;

          const formData = new FormData();
          formData.append('file', file);

          try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData);
            // Обновляем сразу и Redux, и локальный стейт
            setSourceImg(res.data.path);

            const updatedContent = fullContent.map(item => {
              if (item.id === IDforElementOfArticle) {
                return {
                  ...item,
                  alt: res.data.name,
                  image: res.data.path,
                  className: 'mx-auto p-3 rounded-lg shadow-sm'
                };
              }
              return item;
            });
            dispatch(updateReviewContentAnArticle(updatedContent));

          } catch (err) { console.error('Ошибка загрузки', err); }
        }

        return (
          <div className={`relative ${!statusClickPanelTags ? 'z-30' : ''} my-4`}>
            {!sourceImg ? (
              // ЗАГРУЗЧИК
              <div className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-blue-500 bg-slate-50 dark:bg-slate-900 transition-colors">
                <div className="flex flex-col items-center pointer-events-none">
                  <img src={picture} alt="upload" className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm text-slate-500">Нажмите чтобы загрузить фото</p>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={e => {
                    setFile(e.target.files[0]);
                    // Можно добавить автозагрузку, но кнопка надежнее
                  }}
                />
                {file && (
                  <button onClick={sendImage} className="absolute bottom-4 z-20 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Загрузить {file.name.slice(0, 10)}...
                  </button>
                )}
              </div>
            ) : (
              // КАРТИНКА
              <div className="relative group mx-auto max-w-full">
                <img src={sourceImg} alt="uploaded" className="max-h-[500px] w-auto h-auto rounded-lg shadow mx-auto" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <label className="cursor-pointer px-3 py-2 bg-white text-slate-900 text-sm font-bold rounded hover:bg-slate-100">
                    Заменить
                    <input type="file" className="hidden" onChange={e => { setFile(e.target.files[0]); setSourceImg(null); }} />
                  </label>
                </div>
              </div>
            )}
          </div>
        )
      }

      case 'code': {
        return (
          <div className={`my-4 relative group ${!statusClickPanelTags ? 'z-30' : ''}`}>
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-sm">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-700">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /><div className="w-2.5 h-2.5 rounded-full bg-green-500" /></div>
                <input
                  value={localLang}
                  onChange={(e) => setLocalLang(e.target.value)}
                  onBlur={(e) => handleUpdate('language', e.target.value)}
                  placeholder="JS"
                  className="bg-transparent text-right text-xs text-slate-400 font-mono uppercase w-10 outline-none"
                />
              </div>
              <textarea
                value={localCode} // Привязываем к локальному стейту
                onChange={(e) => setLocalCode(e.target.value)}
                onBlur={(e) => handleUpdate('code', e.target.value)}
                placeholder="// Код..."
                className="w-full min-h-[100px] p-3 bg-slate-800 text-slate-200 font-mono text-sm outline-none resize-y border-none block"
                spellCheck="false"
              />
            </div>
          </div>
        )
      }
      default: return null;
    }
  }

  // --- DRAG STYLES ---
  const handleDragOverBlock = (e) => {
    e.preventDefault();
    if (e.target === topRef.current && currentTagButton)
      setClassesForBorderTagTop('w-full h-1/2 absolute top-0 left-0 z-10 border-t-4 border-blue-500 opacity-30 rounded-t-lg bg-blue-100')
    if (e.target === bottomRef.current && currentTagButton)
      setClassesForBorderTagBottom('w-full h-1/2 absolute bottom-0 left-0 z-10 border-b-4 border-blue-500 opacity-30 rounded-b-lg bg-blue-100')
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setClassesForBorderTagTop('w-full h-1/2 absolute top-0 left-0 z-10')
    setClassesForBorderTagBottom('w-full h-1/2 absolute bottom-0 left-0 z-10')
  }

  const handleDrop = () => {
    setClassesForBorderTagTop('w-full h-1/2 absolute top-0 left-0 z-10')
    setClassesForBorderTagBottom('w-full h-1/2 absolute bottom-0 left-0 z-10')
  }

  return (
    <div
      className={`relative transition-all ${statusClickPanelTags ? 'py-1' : ''}`}
      onDragLeave={handleDragEnd}
      onDragOver={handleDragOverBlock}
      onDrop={handleDrop}
    >
      <div ref={topRef} data-position='top' className={classesForBorderTagTop}></div>
      {determine()}
      <div ref={bottomRef} data-position='bottom' className={classesForBorderTagBottom}></div>
    </div>
  )
}

export default NewTag;