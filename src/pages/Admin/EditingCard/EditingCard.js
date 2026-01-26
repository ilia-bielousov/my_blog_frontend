import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import InputCategoryCard from "../CreatingCard/elements/InputCategoryCard.js";
import InputFileCard from "../CreatingCard/elements/InputFileCard.js";

import Modal from "../../../components/Modal.js";
import PageHeader from "../../../components/PageHeader";
import { fetchForAllCards } from '../../../store/asyncAction/cardsAdmin';
import { transliterate, getImageUrl } from "../../../utilities/utilities.js";

const EditingCard = () => {
  const { pseudoName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token] = useState(localStorage.getItem('admin'));

  const allCards = useSelector(state => state.admin.raportsArticles.cards);

  const currentCard = allCards.find(c => c.pseudoName === pseudoName);

  const [modalActive, setModalActive] = useState({ open: false, error: false, loading: false });
  const [imageLoading, setImageLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState('');

  const [data, setData] = useState({ name: '', description: '', choose: '', file: null, _id: null });
  const [errors, setErrors] = useState({ name: '', description: '', choose: '', errorElems: {} });

  useEffect(() => {
    if (allCards.length === 0) {
      dispatch(fetchForAllCards());
    }
  }, [dispatch, allCards.length]);

  useEffect(() => {
    if (currentCard) {
      setData({
        _id: currentCard._id,
        name: currentCard.name,
        description: currentCard.description,
        choose: currentCard.choose,
        file: null
      });
      setPreviewUrl(currentCard.image);
    }
  }, [currentCard]);

  useEffect(() => {
    const uploadImage = async () => {
      if (!data.file || typeof data.file === 'string') return;

      setImageLoading(true);
      const formData = new FormData();
      formData.append('file', data.file);

      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setPreviewUrl(res.data.path);

      } catch (err) {
        console.error("Ошибка загрузки изображения:", err);
      } finally {
        setImageLoading(false);
      }
    };

    uploadImage();
  }, [data.file]);

  const checkErrors = () => {
    let newErrors = {};
    if (!data.name || data.name.length < 4) newErrors.name = 'min';
    if (!data.description || data.description.length < 10) newErrors.description = 'min';
    if (!data.choose) newErrors.choose = 'radio';
    if (!previewUrl && !data.file) {
    }

    setErrors(prev => ({ ...prev, errorElems: newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkErrors()) {
      if (imageLoading) {
        alert("Подождите загрузки изображения.");
        return;
      }

      setModalActive({ open: true, loading: true, error: false });

      try {
        await axios.patch(`${process.env.REACT_APP_API_URL}admin/edit-card`, {
          id: data._id,
          name: data.name,
          description: data.description,
          choose: data.choose,
          image: previewUrl,
          pseudoName: transliterate(data.name.replace(/ /g, '_'))
        });

        setModalActive({ open: true, loading: false, error: false });

      } catch (err) {
        console.error(err);
        setModalActive({ open: true, loading: false, error: true });
      }
    }
  }

  if (!token) return <Navigate to='/' />;
  if (!currentCard && allCards.length > 0) return <div className="p-10 text-center">Карточка не найдена</div>;

  const renderModalSuccess = () => (
    <div className="p-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
      </div>
      <h3 className="text-xl font-bold mb-2">Обновлено!</h3>
      <p className="text-gray-500 mb-6">Карточка успешно отредактирована.</p>
      <button onClick={() => navigate('/admin/edit-cards')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">К списку</button>
    </div>
  );

  const renderModalError = () => (
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold text-red-600 mb-2">Ошибка</h3>
      <p className="mb-4">Не удалось сохранить изменения.</p>
      <button onClick={() => setModalActive({ open: false })} className="px-4 py-2 bg-slate-200 rounded-lg">Закрыть</button>
    </div>
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <PageHeader
        title="Редактирование карточки"
        description="Измените мета-информацию и посмотрите превью."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-6">
              <InputCategoryCard setData={setData} errors={errors} choose={data.choose} defaultValue={data.choose} />
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Название</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Описание</label>
                <textarea
                  rows={4}
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <InputFileCard setData={setData} errors={errors} />
              <p className="text-xs text-slate-400 -mt-4 ml-1">Загрузите новый файл, чтобы заменить текущую обложку.</p>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 items-center">
              {imageLoading && <span className="text-sm text-blue-600 animate-pulse">Обновление фото...</span>}

              <button
                type="button"
                onClick={() => navigate('/admin/edit-cards')}
                className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={modalActive.loading || imageLoading}
                className="px-8 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50"
              >
                {modalActive.loading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1 sticky top-6">
          <h3 className="text-lg font-bold text-slate-500 mb-4 uppercase tracking-wider">Предпросмотр</h3>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg transition-all hover:shadow-xl">
            <div className="h-48 w-full bg-slate-100 dark:bg-slate-700 relative overflow-hidden flex items-center justify-center">
              {imageLoading ? (
                <div className="flex flex-col items-center text-slate-400">
                  <svg className="animate-spin h-8 w-8 mb-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span className="text-xs">Загрузка...</span>
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

              {data.choose && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white shadow-sm">
                  {data.choose}
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                {data.name || "Заголовок статьи..."}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {data.description || "Краткое описание..."}
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

      {modalActive.open && (
        <Modal>
          {!modalActive.error ? renderModalSuccess() : renderModalError()}
        </Modal>
      )}
    </div>
  );
};

export default EditingCard;