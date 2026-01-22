import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from 'nanoid';
import NewTag from "./NewTag";

import {
  addPreviewContentAnArticle,
  deletePreviewContentFromArticle,
  addCurrentTagButton,
  setStatusClickPanelTags,
  afterAddedToReviewContentArticle
} from "../../../../store/adminActions";

import cross from './../../../../assets/images/cross.svg';

const AreaNewTags = () => {
  const dispatch = useDispatch();

  // ГЛАВНОЕ ИЗМЕНЕНИЕ: Берем элементы НАПРЯМУЮ из Redux.
  // Это объединяет логику для Creating и Editing.
  const elements = useSelector(state => state.admin.creatingArticle.previewElements);
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);

  const [dragOverIndex, setDragOverIndex] = useState(null);
  const fieldRef = useRef(null);

  // Удаление элемента
  const deleteElement = (idToRemove) => {
    // Находим индекс элемента по ID (так надежнее, чем просто по индексу)
    const index = elements.findIndex(el => el.id === idToRemove);
    if (index !== -1) {
      dispatch(deletePreviewContentFromArticle(index));
    }
  };

  const dragOverSquareStyle = (e) => {
    e.preventDefault();
  }

  // Логика дропа (Добавление нового элемента)
  const dropHandler = (e) => {
    e.preventDefault();
    const id = nanoid();

    // Если перетаскиваем на пустое место или в конец
    if (currentTagButton && e.target === fieldRef.current) {
      dispatch(addPreviewContentAnArticle({
        tag: currentTagButton,
        id: id,
        text: '', // Инициализируем пустые поля, чтобы не было undefined
        list: '',
        code: '',
        image: '',
        language: ''
      }
      ));
    }
    // Если вставляем МЕЖДУ элементами
    else if (currentTagButton && e.target !== fieldRef.current) {
      const pos = e.target.getAttribute('data-position');
      let index = 0;

      if (pos === 'top') {
        index = dragOverIndex <= 0 ? 0 : dragOverIndex;
      }
      if (pos === 'bottom') {
        index = (dragOverIndex ?? -1) + 1;
      }

      dispatch(afterAddedToReviewContentArticle([index, {
        tag: currentTagButton,
        text: '',
        id: id,
        list: '',
        code: '',
        image: '',
        language: ''
      }]));
    }

    dispatch(setStatusClickPanelTags(false));
    dispatch(addCurrentTagButton(''));
    setDragOverIndex(null);
  }

  // Логика перетаскивания существующих блоков (если нужно менять местами - пока просто ID)
  const handleDragStartBlock = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleDragOverBlock = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setDragOverIndex(null);
  }

  return (
    <div
      onDragOver={dragOverSquareStyle}
      onDrop={dropHandler}
      ref={fieldRef}
      className="relative z-10 w-full flex-1 p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl min-h-[400px] transition-colors hover:border-blue-400 dark:hover:border-slate-500 bg-slate-50/50 dark:bg-slate-900/50"
    >
      {/* Рендерим элементы из Redux */}
      {elements && elements.map((item, index) => {
        return (
          <div
            className='flex gap-4 items-center mb-4 group relative'
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStartBlock(e, item.id)}
            onDragOver={(e) => handleDragOverBlock(e, index)}
            onDragLeave={handleDragEnd}
          >
            {/* Метка тега слева */}
            <div className="shrink-0 w-8 pt-3 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                {item.tag}
              </span>
            </div>

            {/* Контент */}
            <div className="flex-1 min-w-0 relative">
              <NewTag
                {...item} // Передаем ВСЕ свойства (text, tag, id, image...)
                IDforElementOfArticle={item.id} // Дублируем ID для совместимости
              />
            </div>

            {/* Кнопка удаления (появляется при наведении) */}
            <button
              onClick={() => deleteElement(item.id)}
              className="shrink-0 p-2 opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg absolute -right-10 top-2 lg:static"
              title="Удалить блок"
            >
              <img src={cross} alt="delete" className="w-5 h-5" />
            </button>
          </div>
        )
      })}

      {/* Подсказка если пусто */}
      {elements.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
          <p className="text-slate-400 font-medium">Перетащите элементы сюда</p>
        </div>
      )}
    </div>
  );
};

export default AreaNewTags;