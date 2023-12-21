import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPreviewContentAnArticle, addPreviewContentAnArticleAfterEdit, changeBanAddElement } from "../../../store/adminReducer";

const AddTag = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [send, setSend] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editPreviewElements, setEditPreviewElements] = useState([]);
  const IDforElements = useSelector(state => state.admin.creatingArticle.IdElement);
  const [IdElement,] = useState(IDforElements);
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
        if (elem.id === id) {
          return { ...elem, text }
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
      <div className="flex gap-3">
        <button
          className="w-40 p-3 rounded-xl transition bg-blue-300 hover:bg-blue-500 disabled:bg-slate-800"
          disabled={send}
          onClick={() => confirmInputElement(IdElement)}
        >
          подтвердить {props.signButton}
        </button>

        <button
          className="w-40 p-3 rounded-xl transition bg-blue-300 hover:bg-blue-500 disabled:bg-slate-800"
          disabled={!send}
          onClick={(e) => {
            e.preventDefault();
            editInputElement();
            setSend(false);
          }}
        >
          редактировать {props.signButton}
        </button>
      </div>
    )
  }

  const renderInputText = () => {
    return (
      <>
        <input
          className="block w-80 mb-4 py-2 px-4 border-2 rounded-xl "
          type="text"
          placeholder="Введите ..."
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
          className="p-3 w-96 h-72 border-2 rounded-xl resize-none mb-4"
          type="text"
          placeholder="Введите текст ..."
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
      case 'h2': {
        return renderInputText();
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
      <label className="block mb-2 text-lg text-center">
        {props.signLabel}
      </label>
      {determine()}
    </>
  )
}

export default AddTag;