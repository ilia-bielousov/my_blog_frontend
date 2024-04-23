import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewTag from "./NewTag";

import { addIdForNewElement, addPreviewContentAnArticle, deletePreviewContentFromArticle, MinusIdForNewElement, changeIdAllPreviewElements, filterPreviewContentAnArticle, deletedComponentId, addCurrentTagButton, setHoverIndexElement, setStatusClickPanelTags, updateReviewContentAnArticle, afterAddedToReviewContentArticle } from "../../../store/adminActions";

import cross from './../../../assets/images/cross.svg';


const AreaNewTags = () => {
  const dispatch = useDispatch();
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);
  const IDforElementOfArticle = useSelector(state => state.admin.creatingArticle.IdElement);
  const dragOverIndex = useSelector(state => state.admin.creatingArticle.hoverIndexElement);
  const content = useSelector(state => state.admin.creatingArticle.previewElements);

  const [myListElements, setMyListElements] = useState([]);

  const fieldRef = useRef(null);

  const deleteElement = (indexToRemove) => {
    const t = myListElements.filter((item, key) => indexToRemove !== key);

    dispatch(deletedComponentId(indexToRemove));

    const updateT = t.map(item => {
      if (item.id > indexToRemove) {
        return { ...item, id: item.id - 1 }
      } else {
        return item;
      }

    })

    // нужно обновить компоненты на редаксе
    setMyListElements(updateT);

    dispatch(deletePreviewContentFromArticle(indexToRemove));
    dispatch(MinusIdForNewElement());
    dispatch(changeIdAllPreviewElements(indexToRemove));
  };

  const dragOverSquareStyle = (e) => {
    e.preventDefault();
  }

  const dropHandler = (e) => {
    e.preventDefault();

    if (currentTagButton && e.target === fieldRef.current) {
      setMyListElements((prevList) => {
        return [
          ...prevList,
          {
            component: <NewTag
              tag={currentTagButton}
              IDforElementOfArticle={IDforElementOfArticle}
            />,
            id: IDforElementOfArticle
          }
        ]
      }
      );

      dispatch(addPreviewContentAnArticle(
        {
          tag: currentTagButton,
          text: '',
          id: IDforElementOfArticle,
        }
      ));

      dispatch(addIdForNewElement());
    } else {
      setMyListElements(myListElements);
    }

    dispatch(setStatusClickPanelTags(false));
    dispatch(addCurrentTagButton(''));
  }

  // не для добавления, а для пор
  const handleDragStartBlock = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleDragOverBlock = (e, index) => {
    e.preventDefault();

    dispatch(setHoverIndexElement(index));
  };

  const handleDragEnd = (e) => {
    e.preventDefault();

    dispatch(setHoverIndexElement(false));
  }

  const test = (e) => {
    const pos = e.target.getAttribute('data-position');
    let index = null;

    if (pos === 'top') {
      if (dragOverIndex - 1 === 0) {
        index = 1;
      } else {
        index = (dragOverIndex - 1 < 0) || (dragOverIndex - 1 === 0) ? 0 : dragOverIndex;
      }
    }
    if (pos === 'bottom') {
      index = dragOverIndex + 1;
    }

    setMyListElements((prevState) => {
      return prevState.splice(index, 0, {
        component: <NewTag
          tag={currentTagButton}
          IDforElementOfArticle={IDforElementOfArticle}
        />,
        id: IDforElementOfArticle
      });
    });

    dispatch(afterAddedToReviewContentArticle([index, {
      tag: currentTagButton,
      text: '',
      id: IDforElementOfArticle,
    }]));
    dispatch(addIdForNewElement());
  }

  return (
    <div
      onDragOver={(e) => dragOverSquareStyle(e)}
      onDrop={(e) => dropHandler(e)}
      ref={fieldRef}
      className="relative z-10 square w-full min-h-96 p-8 border-dashed border-blue-600 border-2"
    >
      {myListElements && myListElements.map((item, index) => {
        return (
          <div
            className='flex justify-between mb-2'
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStartBlock(e, item.id)}
            onDragOver={(e) => handleDragOverBlock(e, index)}
            onDragLeave={(e) => handleDragEnd(e)}
          >
            <div className="flex flex-col w-full relative"
              onDrop={(e) => test(e)}
            >
              {item.component}
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

export default AreaNewTags;