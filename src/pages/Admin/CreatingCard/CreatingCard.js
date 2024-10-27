import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';

import InputCategoryCard from "./elements/InputCategoryCard.js";
import InputNameCard from "./elements/InputNameCard.js";
import InputFileCard from "./elements/InputFileCard.js";

import Modal from "../../../components/Modal.js";
import { transliterate } from "../../../utilities/utilities.js";

import { statusCreatingCard, changeStatusCreatingArticle, setResponceId } from "../../../store/adminActions.js";

const CreatingCard = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState({ open: false, error: false, loading: true }); // trueпоменял
  const [data, setData] = useState({ name: '', description: '', choose: '', file: false });
  const [errors, setErrors] = useState({ name: '', description: '', choose: '', errorElems: true });
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(changeStatusCreatingArticle(false));
  }, []);

  useEffect(() => {
  }, [errors]);

  if (!token) {
    alert('У вас нет доступа для создания/редактирования статей.')
    return <Navigate to='/' />
  }

  const checkErrors = () => {
    checkErrorsInput('choose', data.choose);
    checkErrorsInput('name', data.name, 4, 30);
    checkErrorsInput('description', data.description, 10, 180);
    checkErrorsInput('file', data.file);
  }

  const checkErrorsInput = (fieldName, fieldValue, min = null, max = null) => {
    setErrors(prevState => {
      const updatedErrorElems = { ...prevState.errorElems }; // Копируем текущее состояние errorElems

      // Условия для проверки ошибок
      if (typeof fieldValue === 'string' && fieldName !== 'choose' && fieldValue.length < min) {
        updatedErrorElems[fieldName] = fieldName === 'name' ? 'name' : 'description';
        return {
          ...prevState,
          [fieldName]: 'min',
          errorElems: updatedErrorElems
        };
      } else if (typeof fieldValue === 'string' && fieldName !== 'choose' && fieldValue.length > max) {
        updatedErrorElems[fieldName] = fieldName === 'name' ? 'name' : 'description';
        return {
          ...prevState,
          [fieldName]: 'max',
          errorElems: updatedErrorElems
        };
      } else if (typeof fieldValue === 'string' && fieldName !== 'choose' && fieldValue.length === 0) {
        updatedErrorElems[fieldName] = fieldName === 'name' ? 'name' : 'description';
        return {
          ...prevState,
          [fieldName]: 'zero',
          errorElems: updatedErrorElems
        };
      } else if (!fieldValue && fieldName !== 'choose') {
        updatedErrorElems[fieldName] = 'image';
        return {
          ...prevState,
          [fieldName]: 'no-image',
          errorElems: updatedErrorElems
        };
      } else if (
        fieldName === 'choose' &&
        !['programming', 'projects', 'modeling'].includes(fieldValue)
      ) {
        updatedErrorElems[fieldName] = 'radio';
        return {
          ...prevState,
          [fieldName]: 'no-choose',
          errorElems: updatedErrorElems
        };
      } else {

        delete updatedErrorElems[fieldName];
        return {
          ...prevState,
          [fieldName]: null,
          errorElems: updatedErrorElems
        };
      }
    });
  };

  const renderModal = () => {
    return (
      <>
        {
          modalActive.loading ?
            <div className="flex h-full justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity={0.25}></path><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>
            </div>
            :
            <div className="flex justify-center items-center flex-col gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 50 50">
                <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z"></path>
              </svg>
              <p className="text-xl text-center">
                Карточка успешно создана.
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
                  Продолжить
                </Link>
              </div>
            </div>
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
                Coś poszło nie tak... spróbuj ponownie.
              </p>
              <button
                type="submit"
                className="block mx-auto p-2 border rounded-md transition hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
                onClick={() => setModalActive({ open: false, error: null })}
              >
                spróbuj ponownie
              </button>
            </>
        }
      </>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!errors.error) {
    //   setModalActive({ open: true, loading: true, error: false })
    //   const formData = new FormData();
    //   formData.append('file', data.file);

    //   await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData)
    //     .then(async res => {
    //       await axios.post(`${process.env.REACT_APP_API_URL}admin/create-card`, { ...data, image: res.data.path, pseudoName: transliterate(data.name.replace(/ /g, '_')) })
    //         .then(res => {
    //           if (res.data.status === 200) {
    //             setModalActive({ open: true, loading: false, error: false });
    //             dispatch(setResponceId(res.data.id));
    //           }
    //         })
    //         .catch(err => {
    //           if (err.response.data.status === 500) {
    //             dispatch(statusCreatingCard(false));
    //             setModalActive({ open: true, loading: false, error: true });
    //           }
    //         });
    //     })
    //     .catch(err => {
    //       dispatch(statusCreatingCard(false));
    //       setModalActive({ open: true, loading: false, error: true });
    //     });
    // }
  }

  // window.addEventListener('beforeunload', function (event) {
  //   event.preventDefault();
  // });

  return (
    <>
      <main className="flex-1 pl-72">
        <article className="p-5">
          <h2 className="text-3xl font-bold mb-2">
            Чтобы создать статью, необходимо сначала создать презентационную карточку.
          </h2>
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
            >
              <InputCategoryCard setData={setData} errors={errors} />
              <InputNameCard setData={setData} errors={errors} />
              <InputFileCard setData={setData} errors={errors} />

              <button
                className="w-48 p-3 mb-3 border-2 rounded-xl transition hover:bg-slate-100 active:bg-slate-200 active:border-slate-200 cursor-pointer disabled:cursor-auto disabled:bg-slate-800 disabled:text-white"
                type="submit"
                onClick={checkErrors}
              >
                отправить
              </button>
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

export default CreatingCard;