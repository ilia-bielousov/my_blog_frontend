import { useRef, useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from 'nanoid';
import NewTagForEdit from './NewTagForEdit';

import {
  addPreviewContentAnArticle,
  deletePreviewContentFromArticle,
  addCurrentTagButton,
  setStatusClickPanelTags,
  afterAddedToReviewContentArticle
} from "../../../../store/adminActions";

import cross from './../../../../assets/images/cross.svg';

// article — это массив элементов из Redux
const AreaNewTagsForEdit = ({ article }) => {
  const dispatch = useDispatch();
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);

  const [myListElements, setMyListElements] = useState([]);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const fieldRef = useRef(null);

  useEffect(() => {
    // ИСПРАВЛЕНИЕ: Проверяем сам массив, а не article.content
    if (article && Array.isArray(article)) {

      setMyListElements(() => {
        // ИСПРАВЛЕНИЕ: Проходимся по article, а не article.content
        const t = article.map((item) => {
          return {
            // ВАЖНО: Передаем весь массив article внутрь, чтобы NewTagForEdit мог его обновлять
            // (Хотя лучше обновлять через Redux, но пока оставим твою логику)
            component: <NewTagForEdit {...item} fullArticleArray={article} />,
            id: item.id,
            tag: item.tag
          }
        });

        return [...t];
      });
    }
  }, [article]);

  const deleteElement = (indexToRemove) => {
    const t = myListElements.filter((item, key) => indexToRemove !== key);
    setMyListElements(t);
    dispatch(deletePreviewContentFromArticle(indexToRemove));
  };

  const dragOverSquareStyle = (e) => {
    e.preventDefault();
  }

  const dropHandler = (e) => {
    e.preventDefault();
    const id = nanoid();

    if (currentTagButton && e.target === fieldRef.current) {
      // Логика добавления в конец
      const newElement = {
        component: <NewTagForEdit tag={currentTagButton} IDforElementOfArticle={id} fullArticleArray={article} />,
        id: id
      };
      setMyListElements(prev => [...prev, newElement]);

      dispatch(addPreviewContentAnArticle({ tag: currentTagButton, id: id }));

    } else if (currentTagButton && e.target !== fieldRef.current && e.target !== null) {
      // Логика вставки между элементами
      const pos = e.target.getAttribute('data-position');
      let index = 0; // default

      // Исправил расчет индекса для безопасности
      if (pos === 'top') index = dragOverIndex;
      if (pos === 'bottom') index = dragOverIndex + 1;

      const newElement = {
        component: <NewTagForEdit tag={currentTagButton} IDforElementOfArticle={id} fullArticleArray={article} />,
        id: id
      };

      setMyListElements(prev => {
        const next = [...prev];
        next.splice(index, 0, newElement);
        return next;
      });

      dispatch(afterAddedToReviewContentArticle([index, {
        tag: currentTagButton,
        text: '',
        id: id,
      }]));
    }

    dispatch(setStatusClickPanelTags(false));
    dispatch(addCurrentTagButton(''));
  }

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
      className="relative z-10 square w-full flex-1 p-3 border-dashed border-blue-600 border-2 min-h-[300px]" // min-h чтобы было куда дропать
    >
      {myListElements && myListElements.map((item, index) => {
        return (
          <div
            className='flex justify-between items-center mb-2 group'
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStartBlock(e, item.id)}
            onDragOver={(e) => handleDragOverBlock(e, index)}
            onDragLeave={handleDragEnd}
          >
            <span className="block p-2 text-xs font-bold text-gray-400 uppercase w-12">
              {item.tag}
            </span>

            <div className="flex flex-col w-full relative">
              <Fragment>
                {item.component}
              </Fragment>
            </div>

            <img
              src={cross}
              alt="delete"
              className="w-6 h-6 ml-2 opacity-0 group-hover:opacity-100 transition cursor-pointer"
              onClick={() => deleteElement(index)}
            />
          </div>
        )
      })}
    </div>
  );
};

export default AreaNewTagsForEdit;