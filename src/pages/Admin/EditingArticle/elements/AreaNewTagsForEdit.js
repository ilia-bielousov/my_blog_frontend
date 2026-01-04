import { useRef, useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from 'nanoid';
import NewTagForEdit from './NewTagForEdit';

import { addPreviewContentAnArticle, deletePreviewContentFromArticle, addCurrentTagButton, setStatusClickPanelTags, afterAddedToReviewContentArticle } from "../../../../store/adminActions";

import cross from './../../../../assets/images/cross.svg';

const AreaNewTagsForEdit = ({ article }) => {
  const dispatch = useDispatch();
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);

  const [myListElements, setMyListElements] = useState([]);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const fieldRef = useRef(null);

  useEffect(() => {
    if (article?.content) {

      setMyListElements(() => {
        const t = article.content.map((item, i) => {
          console.log(item);

          return {
            component: <NewTagForEdit {...item} article={article} />,
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

    if (currentTagButton && e.target === fieldRef.current && e.target !== null) {
      setMyListElements((prevList) => {
        return [
          ...prevList,
          {
            component: <NewTagForEdit
              tag={currentTagButton}
              IDforElementOfArticle={id}
            />,
            id: id
          }
        ]
      }
      );

      dispatch(addPreviewContentAnArticle(
        {
          tag: currentTagButton,
          id: id,
        }
      ));

    } else if (currentTagButton && e.target !== fieldRef.current && e.target !== null) {
      const pos = e.target.getAttribute('data-position');
      let index = null;

      if (pos === 'top') {
        index = dragOverIndex <= 0 ? 0 : dragOverIndex;
      }
      if (pos === 'bottom') {
        index = (dragOverIndex ?? -1) + 1;
      }

      setMyListElements((prevState) => {
        const next = [...prevState];

        next.splice(index, 0, {
          component: <NewTagForEdit
            tag={currentTagButton}
            IDforElementOfArticle={id}
          />,
          id: id
        });
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

    setDragOverIndex(false);
  }

  return (
    <div
      onDragOver={(e) => dragOverSquareStyle(e)}
      onDrop={(e) => dropHandler(e)}
      ref={fieldRef}
      className="relative z-10 square w-full flex-1 p-3 border-dashed border-blue-600 border-2"
    >
      {myListElements && myListElements.map((item, index) => {
        return (
          <div
            className='flex justify-between items-center mb-2'
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStartBlock(e, item.id)}
            onDragOver={(e) => handleDragOverBlock(e, index)}
            onDragLeave={(e) => handleDragEnd(e)}
          >
            <span className="block p-2">
              {item.component.props.tag}
            </span>
            <div className="flex flex-col w-full relative"
            >
              <Fragment>
                {item.component}
              </Fragment>
            </div>
            <img
              src={cross}
              alt="cross"
              className="w-12 h-auto hover:scale-125 transition cursor-pointer"
              onClick={() => deleteElement(index)}
            />
          </div>
        )
      })}
    </div>
  );
};

export default AreaNewTagsForEdit;