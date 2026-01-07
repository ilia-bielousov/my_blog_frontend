import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';

import InputCategoryCard from "./elements/InputCategoryCard.js";
import InputNameCard from "./elements/InputNameCard.js";
import InputFileCard from "./elements/InputFileCard.js";

import Modal from "../../../components/Modal.js";
import PageHeader from "../../../components/PageHeader";
import { transliterate, getImageUrl } from "../../../utilities/utilities.js"; // Не забудь про getImageUrl

import { statusCreatingCard, changeStatusCreatingArticle, setResponceId } from "../../../store/adminActions.js";

const CreatingCard = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState({ open: false, error: false, loading: true });

  // Добавили imageLoading для индикации процесса загрузки самой картинки
  const [imageLoading, setImageLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(''); // Тут храним ссылку от Google
  const [createdCardId, setCreatedCardId] = useState(null);

  const [data, setData] = useState({ name: '', description: '', choose: '', file: null });
  const [errors, setErrors] = useState({ name: '', description: '', choose: '', errorElems: true });
  const [token,] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    dispatch(changeStatusCreatingArticle(false));
  }, [dispatch]);

  // --- ЛОГИКА АВТО-ЗАГРУЗКИ ПРИ ВЫБОРЕ ФАЙЛА ---
  useEffect(() => {
    const uploadImage = async () => {
      // Если файла нет или это не объект File (например, уже строка), выходим
      if (!data.file || typeof data.file === 'string') return;

      setImageLoading(true);
      const formData = new FormData();
      formData.append('file', data.file); // 'file' должно совпадать с multer на сервере

      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        // Успех! Сервер вернул путь к картинке (GCS ссылка)
        setPreviewUrl(res.data.path);

        // Опционально: можно сразу обновить data.file на строку, 
        // но лучше хранить File объект отдельно, а ссылку отдельно, чтобы не путать валидацию.
        // Пока просто сохраним ссылку в previewUrl.
      } catch (err) {
        console.error("Ошибка загрузки изображения:", err);
        // Можно добавить вывод ошибки тостом
      } finally {
        setImageLoading(false);
      }
    };

    uploadImage();
  }, [data.file]);
  // ^ Триггерится каждый раз, когда меняется data.file


  // Валидация
  const checkErrors = () => {
    checkErrorsInput('choose', data.choose);
    checkErrorsInput('name', data.name, 4, 30);
    checkErrorsInput('description', data.description, 10, 180);
    // Проверяем не сам файл, а наличие загруженной ссылки, если файл был выбран
    if (!previewUrl && !data.file) {
      // Ошибка, если вообще ничего нет
      checkErrorsInput('file', null);
    }
  }

  const checkErrorsInput = (fieldName, fieldValue, min = null, max = null) => {
    setErrors(prevState => {
      const updatedErrorElems = { ...prevState.errorElems };
      // ... Твоя старая логика валидации ...
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Проверяем ошибки и наличие загруженной картинки
    if (Object.keys(errors.errorElems).length === 0 && previewUrl) {
      setModalActive({ open: true, loading: true, error: false });

      try {
        // ВТОРОЙ ЗАПРОС: Только данные карточки + ссылка на уже загруженное фото
        const createRes = await axios.post(`${process.env.REACT_APP_API_URL}admin/create-card`, {
          name: data.name,
          description: data.description,
          choose: data.choose,
          image: previewUrl, // Используем ссылку от Google, полученную ранее
          pseudoName: transliterate(data.name.replace(/ /g, '_'))
        });

        if (createRes.data.status === 200) {
          // 1. Сохраняем ID в локальный стейт, чтобы использовать в ссылке
          setCreatedCardId(createRes.data.id);

          // 2. Открываем модалку
          setModalActive({ open: true, loading: false, error: false });

          // 3. (Опционально) Можно оставить диспатч, но для перехода он уже не критичен
          dispatch(setResponceId(createRes.data.id));
        }
      } catch (err) {
        dispatch(statusCreatingCard(false));
        setModalActive({ open: true, loading: false, error: true });
      }
    } else {
      // Если нажали "Создать", но картинка еще грузится или не выбрана
      checkErrors();
      if (!previewUrl) alert("Подождите загрузки изображения или выберите его.");
    }
  }

  if (!token) {
    return <Navigate to='/' />
  }

  // --- UI Компоненты Модалок (без изменений) ---
  const renderModal = () => (
    <div className="p-6 flex flex-col items-center">
      {/* ... твой код модалки успеха ... */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
      </div>
      <h3 className="text-xl font-bold mb-2">Карточка создана!</h3>
      <Link to={`../create-article/${createdCardId}`} relative="admin" className="px-6 py-2 bg-blue-600 text-white rounded-lg mt-4" onClick={() => { setModalActive({ open: false }); dispatch(statusCreatingCard(true)); }}>Продолжить</Link>
    </div>
  );

  const renderModalError = () => (
    <div className="p-6 flex flex-col items-center">
      {/* ... твой код модалки ошибки ... */}
      <h3 className="text-xl font-bold text-red-600 mb-2">Ошибка</h3>
      <button className="px-6 py-2 bg-slate-200 rounded-lg" onClick={() => setModalActive({ open: false, error: null })}>Закрыть</button>
    </div>
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <PageHeader
        title="Новая публикация"
        description="Создание карточки: заполните данные и проверьте превью."
      />

      {/* ГЛАВНАЯ СЕТКА: Слева форма, Справа превью */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* ЛЕВАЯ КОЛОНКА: ФОРМА (Занимает 2 части) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-6">
            <div className="space-y-6">
              <InputCategoryCard setData={setData} errors={errors} choose={data.choose} />
              <InputNameCard setData={setData} errors={errors} />
              <InputFileCard setData={setData} errors={errors} />
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end items-center gap-4">
              {imageLoading && <span className="text-sm text-blue-600 animate-pulse">Загрузка изображения в облако...</span>}

              <button
                type="submit"
                onClick={checkErrors}
                disabled={(modalActive.loading && modalActive.open) || imageLoading}
                className="px-8 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {imageLoading ? 'Ждем фото...' : 'Создать карточку'}
              </button>
            </div>
          </form>
        </div>

        {/* ПРАВАЯ КОЛОНКА: ПРЕВЬЮ (Занимает 1 часть)  */}
        {/* ПРАВАЯ КОЛОНКА: ПРЕВЬЮ (Твой новый код) */}
        <div className="lg:col-span-1 sticky top-6">
          <h3 className="text-lg font-bold text-slate-500 mb-4 uppercase tracking-wider">Предпросмотр</h3>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg transition-all hover:shadow-xl">
            {/* Обложка */}
            <div className="h-48 w-full bg-slate-100 dark:bg-slate-700 relative overflow-hidden flex items-center justify-center">
              {imageLoading ? (
                <div className="flex flex-col items-center text-slate-400">
                  <svg className="animate-spin h-8 w-8 mb-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span className="text-xs">Загрузка в Google Cloud...</span>
                </div>
              ) : previewUrl ? (
                <img
                  src={getImageUrl(previewUrl)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                  <span className="text-sm">Нет изображения</span>
                </div>
              )}

              {/* Бейдж категории */}
              {data.choose && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white shadow-sm">
                  {data.choose}
                </div>
              )}
            </div>

            {/* Контент карточки */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                {data.name || "Заголовок статьи..."}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {data.description || "Здесь будет краткое описание вашей статьи, которое увидит пользователь в ленте..."}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                  Читать далее &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
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