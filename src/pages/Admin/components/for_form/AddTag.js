import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPreviewContentAnArticle, addPreviewContentAnArticleAfterEdit, changeBanAddElement } from "../../../../store/adminReducer";
import './style_component_form.css';

const AddTag = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [send, setSend] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editPreviewElements, setEditPreviewElements] = useState([]);
  const IDforElements = useSelector(state => state.admin.creatingArticle.IdElement);
  const [IdElement, setIdElement] = useState(IDforElements);
  const previewElements = useSelector(state => state.admin.creatingArticle.previewElements);

  const content = {
    tag: props.tag,
    className: props.classN,
    text,
    id: IDforElements
  };
  
  const confirmInputElement = (id = '') => {
    if (editStatus) {
      const t = editPreviewElements.map(elem => {
        if (elem.id == id) {
          return { ...elem, text}
        } else {
          return elem;
        }

      });

      setEditPreviewElements(t);
      dispatch(addPreviewContentAnArticleAfterEdit(t));
      setEditStatus(false);
    } else {
      dispatch(addPreviewContentAnArticle(content));
    }

    dispatch(changeBanAddElement(false));
    setSend(true);
  }

  const editInputElement = () => {
    setEditPreviewElements(previewElements);
    setEditStatus(true);
  }

  const renderButtonsForTextInputs = () => {
    return (
      <div className="form__buttons-inner">
        <button
          className="form__send"
          disabled={send}
          onClick={() => confirmInputElement(IdElement)}
        >
          send {props.signButton}
        </button>

        <button
          className="form__update-state"
          disabled={!send}
          onClick={(e) => { 
            e.preventDefault(); 
            editInputElement(); 
            setSend(false); 
          }}
        >
          edit {props.signButton}
        </button>
      </div>
    )
  }

  const renderInputText = () => {
    return (
      <>
        <input
          className="form__input-title"
          type="text"
          placeholder="input your text"
          readOnly={send ? true : false}
          onChange={(e) => changeText(e)}
        />
        {renderButtonsForTextInputs()}
      </>
    )
  }

  const renderTextArea = () => {
    return (
      <>
        <textarea
          className="form__input-text"
          type="text"
          placeholder="input your text"
          readOnly={send ? true : false}
          onChange={(e) => changeText(e)}
        />
        {renderButtonsForTextInputs()}
      </>
    )
  }

  const renderInputForImage = () => {
    return (
      <input
        type="file"
        className="test"
      />
    )
  }

  const changeText = (e) => {
    setText(e.target.value);
  }

  const determine = () => {
    switch (props.tag) {
      case 'p': {
        return renderTextArea();
      }
      case 'h3': {
        return renderInputText();
      }
      case 'h4': {
        return renderInputText();
      }
      case 'img': {
        return renderInputForImage();
      }
      // потом можно будет добавлять новые теги

      default: {

      }
    }
  }

  return (
    <>
      <label className="form__sign">
        {props.signLabel}
      </label>
      {determine()}
    </>
  )
}

export default AddTag;