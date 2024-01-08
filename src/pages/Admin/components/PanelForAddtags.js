import { useDispatch, useSelector } from "react-redux";
import AddTag from "./AddTag";
import { addComponentToArticle, addIdForNewElement, changeBanAddElement, changeStatusCreatingArticle } from "../../../store/adminReducer";
import { request } from '../../../utilities/request';

const PanelForAddtags = () => {
  const dispatch = useDispatch();
  const contentInElements = useSelector(state => state.admin.creatingArticle.previewElements);
  const IDforArticle = useSelector(state => state.admin.id);
  const IDforElementOfArticle = useSelector(state => state.admin.creatingArticle.IdElement);
  const banAddElement = useSelector(state => state.admin.creatingArticle.banAddElement);

  const addElements = (component) => {
    dispatch(addComponentToArticle(component));
  }

  const addIdElement = () => {
    dispatch(addIdForNewElement());
    dispatch(changeBanAddElement(true));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    request('POST', 'admin/create-article', [...contentInElements, IDforArticle]);

    dispatch(changeStatusCreatingArticle(true));
  }

  return (
    // возможно потом, это можно будет сделать как drag and drop
    <form className="flex flex-col w-3/4 gap-5 p-3 border rounded-xl">
      {/* для заголовков */}
      <div className="flex justify-between items-center">
        <span className="text-xl">Название заголовков</span>
        <div className="flex gap-3">
          <button
            disabled={IDforElementOfArticle === 0 ? false : true}
            className="p-3 rounded-xl transition bg-indigo-300 hover:bg-indigo-400 cursor-pointer disabled:cursor-auto disabled:bg-slate-800"
            onClick={() => {
              addElements(
                <AddTag
                  tag={'h2'}
                  classN={'text-4xl mb-2 font-bold'}
                  signLabel={'Введите название статьи. <h2>'}
                  signButton={'название'}
                />);
              addIdElement();
            }}
          >
            статьи
          </button>
          <button
            disabled={IDforElementOfArticle === 0 ? true : banAddElement}
            className="p-3 rounded-xl transition bg-indigo-300 hover:bg-indigo-400 cursor-pointer disabled:cursor-auto disabled:bg-slate-800"
            onClick={() => {
              addElements(
                <AddTag
                  tag={'h3'}
                  classN={'text-2xl mb-2'}
                  signLabel={'Введите название параграфа. <h3>'}
                  signButton={'параграф'}
                />);
              addIdElement();
            }}
          >
            параграфа
          </button>
          <button
            disabled={IDforElementOfArticle === 0 ? true : banAddElement}
            className="p-3 rounded-xl transition bg-indigo-300 hover:bg-indigo-400 cursor-pointer disabled:cursor-auto disabled:bg-slate-800"
            onClick={() => {
              addElements(
                <AddTag
                  tag={'h4'}
                  classN={'text-xl mb-2'}
                  signLabel={'Введите название подпараграфа. <h4>'}
                  signButton={'подпараграф'}
                />);
              addIdElement();
            }}
          >
            подпараграфа
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl">Добавить тектс</span>
        <button
          disabled={IDforElementOfArticle === 0 ? true : banAddElement}
          className="p-3 rounded-xl transition bg-indigo-300 hover:bg-indigo-400 cursor-pointer disabled:cursor-auto disabled:bg-slate-800"
          onClick={() => {
            addElements(
              <AddTag
                tag={'p'}
                classN={'text-lg text-justify indent-12 mb-2'}
                signLabel={'Введите название параграфа. <p>'}
                signButton={'текст'}
              />)
            addIdElement();
          }}
        >
          параграф
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xl">Картинку</span>
        <button
          disabled={IDforElementOfArticle === 0 ? true : banAddElement}
          className="p-3 rounded-xl transition bg-indigo-300 hover:bg-indigo-400 cursor-pointer disabled:cursor-auto disabled:bg-slate-800"
          onClick={() => {
            addElements(
              <AddTag
                tag={'img'}
                classN={'mx-auto p-3'}
                signLabel={''}
                signButton={'картинка'}
              />);
            addIdElement();
          }}
        >
          Add an image
        </button>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={banAddElement}
          className="w-48 rounded-xl p-4 transition bg-lime-300 hover:bg-lime-400 cursor-pointer"
          onClick={(e) => onSubmit(e)}
        >
          Добавить статью
        </button>
      </div>
    </form>
  );
};

export default PanelForAddtags;