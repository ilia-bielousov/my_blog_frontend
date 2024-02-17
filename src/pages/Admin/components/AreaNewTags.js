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
      dispatch(addComponentToArticle(
        <NewTag
          tag={currentTagButton}
          IDforElementOfArticle={IDforElementOfArticle}
        />
      ));

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