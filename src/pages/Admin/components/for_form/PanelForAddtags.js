import { useState } from "react";
import AddTagForText from "./AddTagForText";
import AddTagForTitle from "./AddTagForTitle";

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
      <button className="panel__item" onClick={() => addElements(<AddTagForTitle id={id} contentInElements={props.contentInElements} setContentInElements={props.setContentInElements} title='h2' />)}>add title h2</button>
      <button className="panel__item" onClick={() => addElements(<AddTagForTitle id={id} contentInElements={props.contentInElements} setContentInElements={props.setContentInElements} title='h3' />)}>add title h3</button>
      <button className="panel__item" onClick={() => addElements(<AddTagForTitle id={id} contentInElements={props.contentInElements} setContentInElements={props.setContentInElements} title='h4' />)}>add title h4</button>
      <button className="panel__item" onClick={() => addElements(<AddTagForText id={id} contentInElements={props.contentInElements} setContentInElements={props.setContentInElements} />)}>add text</button>
      <button className="panel__item">test send </button>
      <button className="panel__item" onClick={() => props.sendArticletoDb()}>send article</button>
    </div>
  );
};

export default PanelForAddtags;