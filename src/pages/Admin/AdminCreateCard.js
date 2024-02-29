import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from 'axios';

import Modal from "./components/Modal";

import { inputChooseCard, inputNameDescriptionCard, statusCreatingCard, changeStatusCreatingArticle, setResponceId } from "../../store/adminReducer";

const formCardInnerCategory = (inputChoose, statusCreating) => {
  return (
    <>
      <label className="block mb-2 text-xl">
        Сначала нужно выбрать, для какой секции будет написана статья.
      </label>
      <input
        onClick={(e) => inputChoose(e)}
        className="mr-1"
        type="radio"
        id="programming"
        name="choose"
        value="programming"
        disabled={statusCreating}
      />
      <label
        className="mr-3 text-lg"
        htmlFor="programming">
        Программирование
      </label>
      <input
        onClick={(e) => inputChoose(e)}
        className="mr-1"
        type="radio"
        id="projects"
        name="choose"
        value="projects"
        disabled={statusCreating}
      />
      <label
        className="mr-3 text-lg"
        htmlFor="projects">
        Ардуино
      </label>
      <input
        className="mr-1"
        onClick={(e) => inputChoose(e)}
        type="radio" id="modeling"
        name="choose"
        value="modeling"
        disabled={statusCreating}
      />
      <label
        className="mb-3 text-lg"
        htmlFor="modeling">
        Моделирование
      </label>
      <br />
    </>
  )
}

const formCardInnerNameArticle = (register, errors, statusCreating) => {
  return (
    <>
      <label
        className="block my-2 text-lg"
        htmlFor="name"
      >
        Придумайте название статьи:
      </label>
      <input
        className="w-80 p-1 px-3 border-2 rounded-xl outline-none focus:border-blue-700"
        {...register('name', { required: true, maxLength: 30, minLength: 4 })}
        type="text"
        id="name"
        name="name"
        readOnly={statusCreating}
      />
      <br />
      {errors.name && errors.name.type === 'required' ? <div className="text-rose-500">поле название обязательное.</div> : null}
      {errors.name && errors.name.type === 'maxLength' ? <div className="text-rose-500">максимальная длина названия 30 символов.</div> : null}
      {errors.name && errors.name.type === 'minLength' ? <div className="text-rose-500">минимальная длина названия 4 символа.</div> : null}
      <label
        className="block mt-2 text-lg"
        htmlFor="description"
      >
        Короткое описание статьи:
      </label>
      <textarea
        className="p-2 border-2 rounded-xl w-80 h-36 outline-none focus:border-blue-700 resize-none"
        {...register('description', { required: true, maxLength: 180, minLength: 4 })}
        id="description"
        name="description"
        readOnly={statusCreating}
      />
      <br />
      {errors.description && errors.description.type === 'required' ? <div className="text-rose-500">поле описание обязательное.</div> : null}
      {errors.description && errors.description.type === 'maxLength' ? <div className="text-rose-500">максимальная длина описания 180 символов.</div> : null}
      {errors.description && errors.description.type === 'minLength' ? <div className="text-rose-500">минимальная длина описания 4 символа.</div> : null}
    </>
  )
}

const formCardInnerImage = (setCardImage) => {
  return (
    <div className="p-3 border rounded-xl w-80 mb-2">
      <input onChange={(e) => setCardImage(e.target.files[0])}
        className="block mb-2"
        type="file"
        name="image"
        id="image"
      />
    </div >
  )
}

const formCardInnerSubmit = (statusCreating) => {
  return (
    <button
      className="w-48 p-3 mb-3 border-2 rounded-xl transition hover:bg-slate-100 active:bg-slate-200 active:border-slate-200 cursor-pointer disabled:cursor-auto disabled:bg-slate-800 disabled:text-white"
      type="submit"
    >
      отправить данные
    </button>
  )
}

const transliterate = (text) => {
  const transliterationMap = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  };

  return text.split('').map(char => transliterationMap[char] || char).join('');
};

const AdminCreateCard = () => {
  const dispatch = useDispatch();
  const choose = useSelector(state => state.admin.creatingCard.content.choose);
  const statusCreating = useSelector(state => state.admin.creatingCard.statusCreating);
  const [modalActive, setModalActive] = useState({ status: null, error: false, loading: false });
  const [file, setFile] = useState('');

  useEffect(() => {
    dispatch(changeStatusCreatingArticle(false));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderModal = () => {
    return (
      <>
        {
          modalActive.loading ?
            <div className="flex h-full justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
            </div>
            :
            <>
              <p className="text-center">
                Карточка успешно создана, тыкните на кнопку, чтобы продолжить.
              </p>
              <div className="flex justify-center">
                <Link
                  to="../create-article"
                  relative="admin"
                  key={'create-article'}
                  type="submit"
                  className="p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
                  onClick={() => {
                    setModalActive({ open: false, error: false })
                    dispatch(statusCreatingCard(true));
                  }
                  }
                >
                  Тыкать сюда
                </Link>
              </div>
            </>
        }
      </>
    )
  }

  const renderModalError = () => {
    return (
      <>
        {
          modalActive.loading ?
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
            :
            <>
              <p className="text-center">
                Что-то пошло не так ... попробуйте еще раз.
              </p>
              <input
                type="submit"
                value="попробовать еще раз"
                className="block mx-auto p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
                onClick={() => setModalActive({ open: false, error: null })}
              />
            </>
        }
      </>
    )
  }

  async function onSubmit(data) {
    dispatch(inputNameDescriptionCard(data));

    if (choose.length !== 0 && file) {
      const formData = new FormData();
      formData.append('file', file);
      setModalActive({ open: true, loading: true, error: false })

      await axios.post('http://localhost:4000/admin/upload', formData)
        .then(res => {
          axios.post('http://localhost:4000/admin/create-card', { choose, ...data, image: `http://localhost:4000${res.data.path}`, pseudoName: transliterate(data.name.replace(/ /g, '_')) })
            .then(res => {
              if (res.data.status === 200) {
                setModalActive({ open: true, loading: false, error: false });
                dispatch(setResponceId(res.data.id));
              }
            })
            .catch(err => {
              if (err.response.data.status === 500) {
                dispatch(statusCreatingCard(false));
                setModalActive({ open: true, loading: false, error: true });
              }
            });
        })
        .catch(err => {
          dispatch(statusCreatingCard(false));
          setModalActive({ open: true, loading: false, error: true });
        });
    } else {
      if (choose.length <= 0) {
        alert('вы не выбрали раздел');
      }

      if (file === '') {
        alert('вы не добавили картинку');
      }
    }
  };

  const inputChoose = (e) => {
    dispatch(inputChooseCard(e.target.value));
  }

  // window.addEventListener('beforeunload', function (event) {
  //   event.preventDefault();
  // });

  return (
    <>
      <main className="flex-1 pl-72">
        <article className="p-5">
          <h2 className="text-3xl font-bold mb-2">
            Создание карточки для статьи
          </h2>
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
              {formCardInnerCategory(inputChoose, statusCreating)}
              {formCardInnerNameArticle(register, errors, statusCreating)}
              {formCardInnerImage(setFile)}
              {formCardInnerSubmit(statusCreating)}
            </form>
          </div>
        </article>
      </main>
      <>
        {modalActive.open ?
          <Modal
          >
            {!modalActive.error ? renderModal() : renderModalError()}
          </Modal> :
          null
        }
      </>
    </>
  );
};

export default AdminCreateCard;