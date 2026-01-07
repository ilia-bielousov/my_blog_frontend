import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { RenderImage } from "../../../../utilities/utilities";
// Импортируем экшен обновления
import { updateReviewContentAnArticle } from "../../../../store/adminActions";

import picture from './../../../../assets/images/picture.svg';

// Обрати внимание: я заменил article на fullArticleArray, как передал выше
const NewTagForEdit = ({ tag, text, id, className, list, language, fullArticleArray, image, alt }) => {
  const dispatch = useDispatch();

  // Локальный стейт для быстрого ввода (чтобы не тормозило при каждом нажатии)
  const [localText, setLocalText] = useState(text || '');
  const [localLanguage, setLocalLanguage] = useState(language || '');

  const [file, setFile] = useState('');
  const [classesForBorderTagTop, setClassesForBorderTagTop] = useState('w-full h-1/2 absolute top-0 left-0 z-10');
  const [classesForBorderTagBottom, setClassesForBorderTagBottom] = useState('w-full h-1/2 absolute bottom-0 left-0 z-10');

  const statusClickPanelTags = useSelector(state => state.admin.creatingArticle.statusClickPanelTags);
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const tagRef = useRef();

  // Обновляем локальный стейт, если пришли новые пропсы
  useEffect(() => {
    setLocalText(text || '');
  }, [text]);


  // --- ГЛАВНАЯ ФУНКЦИЯ ОБНОВЛЕНИЯ REDUX ---
  // Мы вызываем её onBlur (когда убрали фокус), чтобы не перерендеривать всё приложение на каждую букву
  const handleUpdateRedux = (e, field = 'text') => {
    if (!fullArticleArray) return;

    // Создаем копию массива, чтобы не мутировать стейт напрямую
    const updatedContent = fullArticleArray.map(item => {
      if (item.id === id) {
        // Возвращаем обновленный объект
        return {
          ...item,
          [field]: e.target.textContent || e.target.value
        };
      }
      return item;
    });

    // Отправляем в Redux
    dispatch(updateReviewContentAnArticle(updatedContent));
  };

  // Общие пропсы для редактируемых блоков
  const commonProps = {
    ref: tagRef,
    className: `input__newTag p-2 border border-transparent hover:border-blue-100 focus:border-blue-300 outline-none rounded transition-colors ${!statusClickPanelTags ? 'relative z-30' : ''}`,
    contentEditable: true,
    suppressContentEditableWarning: true,
    // onInput обновляет локально
    onInput: (e) => setLocalText(e.target.textContent),
    // onBlur отправляет в глобальный стейт
    onBlur: (e) => handleUpdateRedux(e, tag === 'ul' ? 'list' : 'text'),
  };

  const determine = () => {
    switch (tag) {
      case 'h1': return <h1 {...commonProps} className={`text-3xl font-bold ${commonProps.className}`}>{text}</h1>
      case 'h2': return <h2 {...commonProps} className={`text-2xl font-bold ${commonProps.className}`}>{text}</h2>
      case 'h3': return <h3 {...commonProps} className={`text-xl font-bold ${commonProps.className}`}>{text}</h3>
      case 'p': return <p {...commonProps} className={`text-base ${commonProps.className}`}>{text}</p>
      case 'ul': return <ul {...commonProps} className={`list-disc pl-5 ${commonProps.className}`}>{list}</ul> // ВНИМАНИЕ: Для списка тут нужна более сложная логика, но пока оставил как текст

      case 'iframe': return <div {...commonProps}>{text}</div>

      case 'img': {
        const sendImage = async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('file', file);

          try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData);

            // Обновляем Redux сразу
            const updatedContent = fullArticleArray.map(item => {
              if (item.id === id) {
                return { ...item, image: res.data.path, alt: res.data.name };
              }
              return item;
            });
            dispatch(updateReviewContentAnArticle(updatedContent));

          } catch (err) { console.log('Ошибка загрузки картинки'); }
        }

        return (
          <div className='flex flex-col items-center p-4 border rounded-xl bg-slate-50'>
            {image ? (
              <div className="mb-4">
                <RenderImage imageSource={image} alt={alt} />
              </div>
            ) : <p className="text-gray-400 mb-2">Нет изображения</p>}

            <div className="flex flex-col items-center gap-2">
              <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded shadow-sm flex items-center gap-2">
                <input type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
                <img src={picture} alt="icon" className="w-5" />
                <span className="text-sm">{file ? file.name : "Выбрать файл"}</span>
              </label>

              {file && (
                <button
                  className="px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                  onClick={sendImage}
                >
                  Загрузить
                </button>
              )}
            </div>
          </div>
        )
      }

      case 'code':
        return (
          <div ref={tagRef} className="bg-gray-800 p-4 rounded-lg text-white">
            <textarea
              onInput={(e) => setLocalText(e.target.value)}
              onBlur={(e) => handleUpdateRedux(e, 'text')}
              placeholder="Вставьте код сюда..."
              className='w-full bg-transparent border-none outline-none font-mono text-sm min-h-[100px]'
              value={localText}
            />
            <input
              onInput={(e) => setLocalLanguage(e.target.value)}
              onBlur={(e) => handleUpdateRedux(e, 'language')}
              placeholder="Язык (js, css...)"
              type="text"
              className='w-full bg-gray-700 mt-2 p-1 rounded text-xs text-gray-300 border-none outline-none'
              value={localLanguage}
            />
          </div>
        )
      default: return null;
    }
  }

  // Drag and Drop логика (оставил без изменений, только стили)
  const handleDragOverBlock = (e) => {
    e.preventDefault();
    if (e.target === topRef.current && currentTagButton)
      setClassesForBorderTagTop('w-full h-1/2 absolute top-0 left-0 z-10 border-t-4 border-blue-500 bg-blue-500/10')
    if (e.target === bottomRef.current && currentTagButton)
      setClassesForBorderTagBottom('w-full h-1/2 absolute bottom-0 left-0 z-10 border-b-4 border-blue-500 bg-blue-500/10')
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
      className={`relative ${statusClickPanelTags ? 'ring-2 ring-blue-200 rounded' : ''}`}
      onDragLeave={handleDragEnd}
      onDragOver={handleDragOverBlock}
      onDrop={handleDrop}
    >
      <div ref={topRef} data-position='top' className={classesForBorderTagTop}></div>
      {determine()}
      <div ref={bottomRef} className={classesForBorderTagBottom} data-position='bottom'></div>
    </div>
  )
};

export default NewTagForEdit;