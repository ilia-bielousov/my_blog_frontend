import { useState } from "react";
import AddTag from "./AddTag";

import './PanelForAddtags.css';

const PanelForAddtags = (props) => {
  const [id, setID] = useState(0);

  const addElements = (component) => {
    setID(id + 1);

    props.setElements(elements => {
      return [
        ...elements,
        component
      ]
    });
  }

  return (
    <div className="panel">
      <button
        className="panel__item"
        onClick={() => addElements(
          <AddTag
            tag={'h3'}
            classN={'main__title'}
            signLabel={'Input for your title'}
            signButton={'title'}
            id={id}
            contentInElements={props.contentInElements}
            setContentInElements={props.setContentInElements}
          />)}>add title</button>

      <button
        className="panel__item"
        onClick={() => addElements(
          <AddTag
            tag={'p'}
            classN={'main__text'}
            signLabel={'Input for your text'}
            signButton={'text'}
            id={id}
            contentInElements={props.contentInElements}
            setContentInElements={props.setContentInElements}
          />)}>add text</button>

      <button className="panel__item" onClick={() => props.sendArticletoDb()}>send article</button>
    </div>
  );
};

export default PanelForAddtags;