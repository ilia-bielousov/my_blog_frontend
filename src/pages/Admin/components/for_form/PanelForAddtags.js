import { useDispatch, useSelector } from "react-redux";
import AddTag from "./AddTag";
import { addComponentToArticle, addIdForNewElement, changeBanAddElement } from "../../../../store/adminReducer";
import { request } from './../../../../utilities/request';

import './PanelForAddtags.css';

const PanelForAddtags = () => {
  const dispatch = useDispatch();
  const contentInElements = useSelector(state => state.admin.creatingArticle.previewElements);
  const IDforArticle = useSelector(state => state.admin.id);
  const banAddElement = useSelector(state => state.admin.creatingArticle.banAddElement);

  const addElements = (component) => {
    dispatch(addComponentToArticle(component));
  }

  const addIdElement = () => {
    dispatch(addIdForNewElement());
    dispatch(changeBanAddElement(true));
  }

  // запретить элементы добавлять пока.
  return (
    <div className="panel">
      <button
        disabled={banAddElement}
        className="panel__item"
        onClick={() => {
          addElements(
            <AddTag
              tag={'h3'}
              classN={'main__title'}
              signLabel={'Input for your title'}
              signButton={'title'}
            />);
          addIdElement();
        }}
      >
        add title
      </button>

      <button
        disabled={banAddElement}
        className="panel__item"
        onClick={() => {
          addElements(
            <AddTag
              tag={'p'}
              classN={'main__text'}
              signLabel={'Input for your text'}
              signButton={'text'}
            />)
          addIdElement();
        }}
      >
        add text
      </button>

      <button
        disabled={banAddElement}
        className="panel__item"
        onClick={() => {
          addElements(
            <AddTag
              tag={'img'}
              classN={''}
              signLabel={''}
              signButton={'your image'}
            />);
          addIdElement();
        }}
      >
        add image
      </button>

      <button
        className="panel__item"
        onClick={() => { contentInElements.push(IDforArticle); request('POST', 'create-article', contentInElements) }}
      >
        send article
      </button>
    </div>
  );
};

export default PanelForAddtags;