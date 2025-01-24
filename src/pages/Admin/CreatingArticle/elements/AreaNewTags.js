import { useRef, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewTag from "./NewTag";

import { addIdForNewElement, addPreviewContentAnArticle, deletePreviewContentFromArticle, addCurrentTagButton, setHoverIndexElement, setStatusClickPanelTags, afterAddedToReviewContentArticle } from "../../../../store/adminActions";

import cross from './../../../../assets/images/cross.svg';


const AreaNewTags = () => {
  const dispatch = useDispatch();
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);
  const IDforElementOfArticle = useSelector(state => state.admin.creatingArticle.IdElement);
  const dragOverIndex = useSelector(state => state.admin.creatingArticle.hoverIndexElement);

  const [myListElements, setMyListElements] = useState([]);

  const fieldRef = useRef(null);

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

    if (currentTagButton && e.target === fieldRef.current && e.target !== null) {
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

    if (currentTagButton) {
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
            draggable //пока непонятно
            onDragStart={(e) => handleDragStartBlock(e, item.id)}
            onDragOver={(e) => handleDragOverBlock(e, index)}
            onDragLeave={(e) => handleDragEnd(e)}
          >
            <span className="block p-2">
              {item.component.props.tag}
            </span>
            <div className="flex flex-col w-full relative"
              onDrop={(e) => test(e)}
            >
              {/* {createElement('div', { className: '' }, item.component)} */}
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

export default AreaNewTags;