import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewTag from "./NewTag";

import { addIdForNewElement, addPreviewContentAnArticle, deletePreviewContentFromArticle, MinusIdForNewElement, changeIdAllPreviewElements } from "../../../store/adminReducer";

import cross from './../../../assets/images/cross.svg';


const AreaNewTags = () => {
  const dispatch = useDispatch();
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);
  const IDforElementOfArticle = useSelector(state => state.admin.creatingArticle.IdElement);

  const [myListElements, setMyListElements] = useState([]);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const fieldRef = useRef(null);

  const deleteElement = (indexToRemove) => {
    const t = myListElements.filter((item, key) => indexToRemove !== key);

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
    console.log('target ', e.target);
    console.log('ref ', fieldRef.current);

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
    }
  }

  // не для добавления, а для пор
  const handleDragStartBlock = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleDragOverBlock = (e, index) => {
    e.preventDefault();

    setDragOverIndex(index);
  };

  const handleDropBlock = (e, index) => {
    console.log('test');

    const id = e.dataTransfer.getData('id');
    const dragIndex = myListElements.findIndex((block) => block.id === parseInt(id));
    const dragBlock = myListElements[dragIndex];

    setMyListElements((prevBlocks) => {
      const newBlocks = prevBlocks.filter((block) => block.id !== parseInt(id));
      newBlocks.splice(index, 0, dragBlock);
      return newBlocks;
    });
    setDragOverIndex(null); // Сбрасываем состояние после завершения операции перетаскивания
  };

  return (
    <div
      onDragOver={(e) => dragOverSquareStyle(e)}
      onDrop={(e) => dropHandler(e)}
      ref={fieldRef}
      className="square w-full min-h-96 p-8 border-dashed border-blue-600 border-2"
    >
      <div>
        {myListElements && myListElements.map((item, index) => {
          if (item.component) {
            return (
              <div
                className={index === dragOverIndex ? `border-2 bg-slate-200 flex justify-between gap-5 mb-2 p-2` : `flex justify-between gap-5 mb-2 p-2`}
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStartBlock(e, item.id)}
                onDragOver={(e) => handleDragOverBlock(e, index)}
                onDrop={(e) => handleDropBlock(e, index)}
              >
                {item.component}
                <img
                  src={cross}
                  alt="cross"
                  className="w-12 h-auto hover:scale-125 transition cursor-pointer"
                  onClick={() => deleteElement(index)}
                />
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default AreaNewTags;