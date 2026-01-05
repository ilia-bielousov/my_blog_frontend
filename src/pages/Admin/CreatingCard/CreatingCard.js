import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';

import InputCategoryCard from "./elements/InputCategoryCard.js";
import InputNameCard from "./elements/InputNameCard.js";
import InputFileCard from "./elements/InputFileCard.js";

import Modal from "../../../components/Modal.js";
import PageHeader from "../../../components/PageHeader"; // Импортируем наш заголовок
import { transliterate } from "../../../utilities/utilities.js";

import { statusCreatingCard, changeStatusCreatingArticle, setResponceId } from "../../../store/adminActions.js";

const CreatingCard = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState({ open: false, error: false, loading: true });
  const [data, setData] = useState({ name: '', description: '', choose: '', file: false });
  const [errors, setErrors] = useState({ name: '', description: '', choose: '', errorElems: true });
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(changeStatusCreatingArticle(false));
  }, [dispatch]);

  // Валидация (логика сохранена)
  const checkErrors = () => {
    checkErrorsInput('choose', data.choose);
    checkErrorsInput('name', data.name, 4, 30);
    checkErrorsInput('description', data.description, 10, 180);
    checkErrorsInput('file', data.file);
  }

  const checkErrorsInput = (fieldName, fieldValue, min = null, max = null) => {
    setErrors(prevState => {
      const updatedErrorElems = { ...prevState.errorElems };

      if (typeof fieldValue === 'string' && fieldName !== 'choose' && fieldValue.length < min) {
        updatedErrorElems[fieldName] = fieldName === 'name' ? 'name' : 'description';
        return { ...prevState, [fieldName]: 'min', errorElems: updatedErrorElems };
      } else if (typeof fieldValue === 'string' && fieldName !== 'choose' && fieldValue.length > max) {
        updatedErrorElems[fieldName] = fieldName === 'name' ? 'name' : 'description';
        return { ...prevState, [fieldName]: 'max', errorElems: updatedErrorElems };
      } else if (typeof fieldValue === 'string' && fieldName !== 'choose' && fieldValue.length === 0) {
        updatedErrorElems[fieldName] = fieldName === 'name' ? 'name' : 'description';
        return { ...prevState, [fieldName]: 'zero', errorElems: updatedErrorElems };
      } else if (!fieldValue && fieldName !== 'choose') {
        updatedErrorElems[fieldName] = 'image';
        return { ...prevState, [fieldName]: 'no-image', errorElems: updatedErrorElems };
      } else if (fieldName === 'choose' && !['programming', 'projects', 'modeling'].includes(fieldValue)) {
        updatedErrorElems[fieldName] = 'radio';
        return { ...prevState, [fieldName]: 'no-choose', errorElems: updatedErrorElems };
      } else {
        delete updatedErrorElems[fieldName];
        return { ...prevState, [fieldName]: null, errorElems: updatedErrorElems };
      }
    });
  }

  const handleSubmitImage = async (e) => {
    const formData = new FormData();
    formData.append('file', data.file);

    const uploadRes = await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(uploadRes.data.path);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (Object.keys(errors.errorElems).length === 0) {
      setModalActive({ open: true, loading: true, error: false });
      const formData = new FormData();
      formData.append('file', data.file);

      try {
        const uploadRes = await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const createRes = await axios.post(`${process.env.REACT_APP_API_URL}admin/create-card`, {
          ...data,
          image: uploadRes.data.path,
          pseudoName: transliterate(data.name.replace(/ /g, '_'))
        });

        if (createRes.data.status === 200) {
          setModalActive({ open: true, loading: false, error: false });
          dispatch(setResponceId(createRes.data.id));
        }
      } catch (err) {
        dispatch(statusCreatingCard(false));
        setModalActive({ open: true, loading: false, error: true });
      }
    }
  }

  if (!token) {
    alert('У вас нет доступа для создания/редактирования статей.')
    return <Navigate to='/' />
  }

  // --- UI Модалки (Успех) ---
  const renderModal = () => (
    <div className="p-6 flex flex-col items-center">
      {modalActive.loading ? (
        <div className="py-8"><svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
      ) : (
        <>
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Карточка создана!</h3>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Теперь можно переходить к наполнению статьи.</p>
          <Link
            to="../create-article"
            relative="admin"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            onClick={() => {
              setModalActive({ open: false, error: false })
              dispatch(statusCreatingCard(true));
            }}
          >
            Продолжить создание
          </Link>
        </>
      )}
    </div>
  );

  // --- UI Модалки (Ошибка) ---
  const renderModalError = () => (
    <div className="p-6 flex flex-col items-center">
      {modalActive.loading ? (
        <div className="py-8"><svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>
      ) : (
        <>
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ошибка</h3>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Не удалось создать карточку. Попробуйте еще раз.</p>
          <button
            className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
            onClick={() => setModalActive({ open: false, error: null })}
          >
            Закрыть и повторить
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 1. Заголовок */}
      <PageHeader
        title="Новая публикация"
        description="Шаг 1: Создание презентационной карточки для ленты блога."
      />

      {/* 2. Форма в карточке */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-6">

          {/* Контейнеры для инпутов. 
                ВАЖНО: Убедись, что внутри компонентов InputCategoryCard и др. 
                нет жестко заданных цветов текста (text-black), иначе в темной теме их не будет видно.
            */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InputCategoryCard setData={setData} errors={errors} />
              <InputNameCard setData={setData} errors={errors} />
            </div>
            <div>
              <InputFileCard setData={setData} errors={errors} handleSubmitImage={handleSubmitImage} />
            </div>
          </div>

          {/* Разделитель и кнопка */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
            <button
              type="submit"
              onClick={checkErrors}
              disabled={modalActive.loading && modalActive.open}
              className="
                        px-8 py-3 rounded-xl font-semibold shadow-sm transition-all
                        bg-blue-600 hover:bg-blue-700 text-white
                        disabled:opacity-50 disabled:cursor-not-allowed
                        active:transform active:scale-95
                    "
            >
              Создать карточку
            </button>
          </div>

        </form>
      </div>

      {/* 3. Модалка */}
      {modalActive.open && (
        <Modal>
          {!modalActive.error ? renderModal() : renderModalError()}
        </Modal>
      )}
    </div>
  );
};

export default CreatingCard;