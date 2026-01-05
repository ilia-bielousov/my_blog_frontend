import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

// Используем те же компоненты, что и при создании
import InputCategoryCard from "../CreatingCard/elements/InputCategoryCard.js";
import InputNameCard from "../CreatingCard/elements/InputNameCard.js";
import InputFileCard from "../CreatingCard/elements/InputFileCard.js";

import Modal from "../../../components/Modal.js";
import PageHeader from "../../../components/PageHeader";
import { fetchForAllCards } from '../../../store/asyncAction/cardsAdmin';
import { transliterate } from "../../../utilities/utilities.js";

const EditingCard = () => {
  const { pseudoName } = useParams(); // Получаем ID или имя из URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allCards = useSelector(state => state.admin.raportsArticles.cards);

  // Ищем карточку в Redux (или можно делать запрос на сервер, если в Redux пусто)
  const currentCard = allCards.find(c => c.pseudoName === pseudoName);

  const [modalActive, setModalActive] = useState({ open: false, error: false, loading: false });
  const [data, setData] = useState({ name: '', description: '', choose: '', file: false, _id: null });
  // Сохраняем путь к старой картинке для превью
  const [currentImagePreview, setCurrentImagePreview] = useState(null);
  const [errors, setErrors] = useState({ name: '', description: '', choose: '', errorElems: {} }); // Изначально пустой объект ошибок

  // 1. Загрузка данных
  useEffect(() => {
    if (allCards.length === 0) {
      dispatch(fetchForAllCards());
    }
  }, [dispatch, allCards.length]);

  // 2. Заполнение формы при появлении данных
  useEffect(() => {
    if (currentCard) {
      setData({
        _id: currentCard._id,
        name: currentCard.name,
        description: currentCard.description,
        choose: currentCard.choose,
        file: false // Файл сбрасываем, так как input type="file" нельзя предзаполнить
      });
      setCurrentImagePreview(currentCard.image);
    }

    console.log(currentCard);
  }, [currentCard]);

  // 3. Валидация (аналогично созданию)
  const checkErrors = () => {
    // Тут упрощенная логика, можно скопировать полную из CreatingCard
    let newErrors = {};
    if (!data.name || data.name.length < 4) newErrors.name = 'min';
    if (!data.description || data.description.length < 10) newErrors.description = 'min';
    if (!data.choose) newErrors.choose = 'radio';

    // Файл не проверяем жестко, так как может остаться старый

    setErrors(prev => ({ ...prev, errorElems: newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  // 4. Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkErrors()) {
      setModalActive({ open: true, loading: true, error: false });

      try {
        let imagePath = currentImagePreview; // По умолчанию оставляем старую картинку

        // А. Если выбрали новый файл -> грузим его
        if (data.file) {
          const formData = new FormData();
          formData.append('file', data.file);
          const uploadRes = await axios.post(`${process.env.REACT_APP_API_URL}admin/upload`, formData);
          imagePath = uploadRes.data.path;
        }

        // Б. Обновляем карточку (PATCH запрос)
        // ВАЖНО: убедись, что на бэкенде есть роут для редактирования карточки (например /admin/edit-card)
        await axios.patch(`${process.env.REACT_APP_API_URL}admin/edit-card`, {
          id: data._id, // ID карточки для поиска в БД
          name: data.name,
          description: data.description,
          choose: data.choose,
          image: imagePath,
          pseudoName: transliterate(data.name.replace(/ /g, '_')) // Обновляем ссылку тоже
        });

        setModalActive({ open: true, loading: false, error: false });

      } catch (err) {
        console.error(err);
        setModalActive({ open: true, loading: false, error: true });
      }
    }
  }

  // Рендер модалок (можно вынести в отдельный файл, чтобы не дублировать везде)
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

  if (!currentCard && allCards.length > 0) return <div className="p-10 text-center">Карточка не найдена</div>;
  console.log(currentCard);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <PageHeader
        title="Редактирование карточки"
        description="Измените мета-информацию: заголовок, описание или обложку."
      />

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Твои компоненты инпутов. Они должны принимать setData и errors */}
              <InputCategoryCard setData={setData} errors={errors} defaultValue={data.choose} />

              {/* ВАЖНО: Проверь, умеет ли InputNameCard принимать `value` или `defaultValue`. 
                        Если он полностью неуправляемый внутри, нужно будет его чуть доработать. 
                        Но обычно setData обновляет стейт, и если инпут берет value={data.name}, то все ок. */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Название</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-colors"
                />
                {/* Временная замена InputNameCard для гарантии работы value */}
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
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Обложка</label>

              {/* Превью текущей картинки */}
              {currentImagePreview && !data.file && (
                <div className="mb-4 relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img
                    src={`${process.env.REACT_APP_API_URL}upload/${currentImagePreview}`}
                    alt="Current"
                    className="w-full h-48 object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-white text-sm font-bold bg-black/50 px-3 py-1 rounded-full">Текущее изображение</span>
                  </div>
                </div>
              )}

              <InputFileCard setData={setData} errors={errors} />
              <p className="text-xs text-slate-400 mt-2">Загрузите файл, только если хотите заменить текущий.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/edit-cards')}
              className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={modalActive.loading}
              className="px-8 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              {modalActive.loading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>

        </form>
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