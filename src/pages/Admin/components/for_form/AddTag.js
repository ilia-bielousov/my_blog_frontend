import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPreviewContentAnArticle, changeBanAddElement } from "../../../../store/adminReducer";
import './style_component_form.css';

const AddTag = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [send, setSend] = useState(false);
  const IDforElements = useSelector(state => state.admin.creatingArticle.IdElement);

  const content = {
    tag: props.tag,
    className: props.classN,
    text,
    id: IDforElements
  };
  // работаю над логикой
  const confirmInputElement = () => {
    dispatch(addPreviewContentAnArticle(content));
    setSend(true);
    dispatch(changeBanAddElement(false));
  }

  const renderButtonsForTextInputs = () => {
    return (
      <div className="form__buttons-inner">
        <button
          className="form__send"
          disabled={send}
          onClick={() => confirmInputElement()}
        >
          send {props.signButton}
        </button>

        {/* неправиьлно работает логика обновления */}
        <button
          className="form__update-state"
          disabled={!send}
          onClick={(e) => { e.preventDefault(); setSend(false); }}
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