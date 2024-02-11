import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewTag from "./NewTag";

import { addIdForNewElement, addComponentToArticle, addPreviewContentAnArticle } from "../../../store/adminReducer";

const AreaNewTags = () => {
  const dispatch = useDispatch();

  const tags = useSelector(state => state.admin.creatingArticle.elements);
  const currentTagButton = useSelector(state => state.admin.creatingArticle.currentTagButton);
  const IDforElementOfArticle = useSelector(state => state.admin.creatingArticle.IdElement);

  const dragOverSquareStyle = (e) => {
    e.preventDefault();
  }

  const dropHandler = (e) => {
    e.preventDefault();

    if (currentTagButton) {
      dispatch(addIdForNewElement());

      dispatch(addComponentToArticle(
        <NewTag
          tag={currentTagButton}
          text='Введите свой текст'
        />
      ));

      dispatch(addPreviewContentAnArticle(
        {
          tag: currentTagButton,
          // классы
          text: '',
          id: IDforElementOfArticle
        }
      ));
    } else {
      alert('вы не взяли элемент, чтобы перетащить');
    }
  }

  return (
    <div
      onDragOver={(e) => dragOverSquareStyle(e)}
      onDrop={(e) => dropHandler(e)}
      className="square w-full h-64 p-5 border-dashed border-blue-600 border-2">
      {tags.map((item, i) => {
        return (
          <Fragment key={i}>
            {item}
          </Fragment>
        )
      })}
    </div>
  );
};

export default AreaNewTags;