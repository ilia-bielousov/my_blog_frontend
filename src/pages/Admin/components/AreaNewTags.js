import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewTag from "./NewTag";

import { addIdForNewElement, addPreviewContentAnArticle, deletePreviewContentFromArticle, MinusIdForNewElement, changeIdAllPreviewElements, filterPreviewContentAnArticle, deletedComponentId, addCurrentTagButton } from "../../../store/adminActions";

import cross from './../../../assets/images/cross.svg';


const AreaNewTags = () => {
  const dispatch = useDispatch();
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);
  const IDforElementOfArticle = useSelector(state => state.admin.creatingArticle.IdElement);

  const [myListElements, setMyListElements] = useState([]);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [classesForBorderTagTop, setClassesForBorderTagTop] = useState('h-1/2 bg-transparent absolute top-0 left-0 z-auto w-full');
  const [classesForBorderTagBottom, setClassesForBorderTagBottom] = useState('h-1/2 bg-transparent absolute bottom-0 left-0 z-auto w-full');

  const fieldRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

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

    console.log(e.target);
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
    }
  }

  // не для добавления, а для пор
  const handleDragStartBlock = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleDragOverBlock = (e, index) => {
    e.preventDefault();

    setDragOverIndex(index);

    if (e.target === topRef.current) {
      setClassesForBorderTagTop('h-1/2 bg-transparent absolute top-0 left-0 z-20 w-full border-t-4 border-red-600');
      setClassesForBorderTagBottom('h-1/2 bg-transparent absolute bottom-0 left-0 z-20 w-full');
    }

    if (e.target === bottomRef.current) {
      setClassesForBorderTagTop('h-1/2 bg-transparent absolute top-0 left-0 z-20 w-full');
      setClassesForBorderTagBottom('h-1/2 bg-transparent absolute bottom-0 left-0 z-20 w-full border-b-4 border-red-600');
    }
  };

  const handleDragEnd = (e) => {
    e.preventDefault();

    setDragOverIndex(false);
  }

  const handleDropBlock = (e, index) => {
    const id = e.dataTransfer.getData('id');
    const dragIndex = myListElements.findIndex((block) => block.id === parseInt(id));
    const dragBlock = myListElements[dragIndex];

    setMyListElements((prevBlocks) => {
      const newBlocks = prevBlocks.filter((block) => block.id !== parseInt(id));

      newBlocks.splice(index, 0, dragBlock);
      return newBlocks;
    });

    dispatch(filterPreviewContentAnArticle([id, index]))

    setDragOverIndex(null); // Сбрасываем состояние после завершения операции перетаскивания
    setClassesForBorderTagTop('h-1/2 bg-transparent absolute top-0 left-0 z-auto w-full');
    setClassesForBorderTagBottom('h-1/2 bg-transparent absolute bottom-0 left-0 z-auto w-full');
  };

  return (
    <div
      onDragOver={(e) => dragOverSquareStyle(e)}
      onDrop={(e) => dropHandler(e)}
      ref={fieldRef}
      className="relative z-10 square w-full min-h-96 p-8 border-dashed border-blue-600 border-2"
    >
      {myListElements && myListElements.map((item, index) => {
        if (item.component) {
          return (
            <div
              className='flex justify-between mb-2'
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStartBlock(e, item.id)}
              onDragOver={(e) => handleDragOverBlock(e, index)}
              onDragLeave={(e) => handleDragEnd(e)}
              onDrop={(e) => handleDropBlock(e, index)}
            >
              <div className="flex flex-col w-full relative">
                <div
                  ref={topRef}
                  className={index === dragOverIndex ? `${classesForBorderTagTop}` : 'h-1/2 bg-transparent absolute top-0 left-0 z-0 w-full'}>
                </div>
                {/* динамически нужно строить классы взависимости от выбраного тега */}
                {item.component}
                <div
                  ref={bottomRef}
                  className={index === dragOverIndex ? `${classesForBorderTagBottom}` : 'h-1/2 bg-transparent absolute bottom-0 left-0 z-0 w-full'}>
                </div>
              </div>
              <img
                src={cross}
                alt="cross"
                className="w-12 h-auto hover:scale-125 transition cursor-pointer"
                onClick={() => deleteElement(index)}
              />
            </div>
          )
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default AreaNewTags;