import AddTagForText from "./AddTagForText";
import AddTagForTitle from "./AddTagForTitle";

import './PanelForAddtags.css';

const PanelForAddtags = (props) => {
  const addElements = (component) => {
    props.setElements(elements => {
      return [
        ...elements,
        component
      ]
    });
  }

  return (
    <div className="panel">
      <button className="panel__item" onClick={() => addElements(<AddTagForTitle />)}>add title</button>
      <button className="panel__item" onClick={() => addElements(<AddTagForText />)}>add text</button>
      <button className="panel__item">test send </button>
      <button className="panel__item">send article</button>
    </div>
  );
};

export default PanelForAddtags;