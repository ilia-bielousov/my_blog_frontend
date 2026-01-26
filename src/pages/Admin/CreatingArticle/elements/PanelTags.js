import { useDispatch } from 'react-redux';
import { addCurrentTagButton, setStatusClickPanelTags } from '../../../../store/adminActions';

const tagsRender = [
  { title: 'Заголовок H1', dataTag: 'h1', label: 'H1', desc: 'Заголовок статьи' },
  { title: 'Заголовок H2', dataTag: 'h2', label: 'H2', desc: 'Секция' },
  { title: 'Заголовок H3', dataTag: 'h3', label: 'H3', desc: 'Заголовок 3 уровня' },
  { title: 'Параграф', dataTag: 'p', icon: 'paragraph', desc: 'Основной текст' },
  { title: 'Список', dataTag: 'ul', icon: 'list', desc: 'Маркированный список' },
  { title: 'Цитата', dataTag: 'blockquote', icon: 'quote', desc: 'Выделить мысль' },
  { title: 'Инфо-блок', dataTag: 'alert', icon: 'alert', desc: 'Предупреждение/Совет' },
  { title: 'Картинка', dataTag: 'img', icon: 'image', desc: 'Изображение' },
  { title: 'Видео', dataTag: 'iframe', icon: 'video', desc: 'YouTube Video' },
  { title: 'Код', dataTag: 'code', icon: 'code', desc: 'Snippet кода' },
  { title: 'Разделитель', dataTag: 'hr', icon: 'minus', desc: 'Линия' },
  { title: 'Кнопка', dataTag: 'btn', icon: 'link', desc: 'Ссылка-действие' },
];

const Icons = {
  list: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  paragraph: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  video: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>,
  code: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  quote: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" /></svg>,
  minus: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>,
  alert: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>,
  link: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
}

const PanelTags = ({ setModalActive }) => {
  const dispatch = useDispatch();

  const dragStartHandler = (e, tagData) => {
    dispatch(addCurrentTagButton(tagData));
    dispatch(setStatusClickPanelTags(true));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 flex flex-col gap-4">

      <div className="pb-4 border-b border-slate-100 dark:border-slate-700">
        <h3 className="font-bold text-slate-900 dark:text-white">Инструменты</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Перетащите элемент в редактор</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {tagsRender.map((tag, key) => (
          <div
            key={key}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, tag.dataTag)}
            onDragEnd={() => dispatch(setStatusClickPanelTags(false))}
            className="group flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg cursor-grab active:cursor-grabbing hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
            title={tag.title}
          >
            <div className="text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              {tag.label ? (
                <span className="text-xl font-bold font-serif">{tag.label}</span>
              ) : (
                Icons[tag.icon]
              )}
            </div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wide">{tag.dataTag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelTags;