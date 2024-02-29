import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewTag from "./NewTag";

import { addIdForNewElement, addPreviewContentAnArticle, deletePreviewContentFromArticle, MinusIdForNewElement, changeIdAllPreviewElements } from "../../../store/adminReducer";

import cross from './../../../assets/images/cross.svg';


const AreaNewTags = () => {
  const dispatch = useDispatch();
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);
  const IDforElementOfArticle = useSelector(state => state.admin.creatingArticle.IdElement);

  const [myListElements, setMyListElements] = useState([]);

  const deleteElement = (indexToRemove) => {
    setMyListElements(() => {
      return myListElements.map((item, key) => {
        if (indexToRemove !== key) {
          return item;
        }
      })
    });

    dispatch(deletePreviewContentFromArticle(indexToRemove));
    dispatch(MinusIdForNewElement());
    dispatch(changeIdAllPreviewElements());
  };

  const dragOverSquareStyle = (e) => {
    e.preventDefault();
  }

  const dropHandler = (e) => {
    e.preventDefault();

    if (currentTagButton) {
      setMyListElements(() => {
        return [
          ...myListElements,
          <NewTag
            tag={currentTagButton}
            IDforElementOfArticle={IDforElementOfArticle}
            deleteElement={deleteElement}
          />]
      });

      dispatch(addPreviewContentAnArticle(
        {
          tag: currentTagButton,
          text: '',
          id: IDforElementOfArticle
        }
      ));

      dispatch(addIdForNewElement());
    } else {
      alert('вы не взяли элемент, чтобы перетащить');
    }
  }

  return (
    <div
      onDragOver={(e) => dragOverSquareStyle(e)}
      onDrop={(e) => dropHandler(e)}
      className="square w-full min-h-96 p-8 border-dashed border-blue-600 border-2">
      {myListElements && myListElements.map((item, i) => {
        if (item) {
          return (
            <div
              className="flex justify-between gap-5 mb-2"
              key={i}>
              {item}
              <img
                src={cross}
                alt="cross"
                className="w-12 h-auto hover:scale-125 transition cursor-pointer"
                onClick={() => deleteElement(i)}
              />
            </div>
          )
        }
      })}
    </div>
  );
};

export default AreaNewTags;