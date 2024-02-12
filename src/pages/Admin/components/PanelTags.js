import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentTagButton, changeStatusCreatingArticle, addCurrentStyleClassText } from '../../../store/adminReducer';

import { request } from '../../../utilities/request';

// images
import arrow from './../../../assets/images/arrow-history.svg';
import list from './../../../assets/images/list.svg';
import paragraph from './../../../assets/images/paragraph.svg';
import picture from './../../../assets/images/picture.svg';
import video from './../../../assets/images/video.svg';
import code from './../../../assets/images/code.svg';

// data для генерации тегов // возможно потом перенесу в монго это
const tagsRender = [{
  title: 'добавить заголовок 1 уровня',
  dataTag: 'h1',
  textIntag: 'H1',
},
{
  title: 'добавить заголовок 2 уровня',
  dataTag: 'h2',
  textIntag: 'H2',
},
{
  title: 'добавить заголовок 3 уровня',
  dataTag: 'h3',
  textIntag: 'H3',
},
{
  title: 'добавить список',
  dataTag: 'ul',
  src: list,
  alt: 'list',
},
{
  title: 'добавить параграф',
  dataTag: 'p',
  src: paragraph,
  alt: 'paragraph',
},
{
  tagSpace: true,
  space: true,
},
{
  title: 'добавить картинку',
  dataTag: 'img',
  src: picture,
  alt: 'download',
},
{
  title: 'добавить видео',
  dataTag: 'пропуск',
  src: video,
  alt: 'video',
},
{
  tagSpace: true,
  space: true
},
{
  title: 'добавить код',
  dataTag: 'code',
  src: code,
  alt: 'code',
},
];

const PanelTags = () => {
  const dispatch = useDispatch();

  const content = useSelector(state => state.admin.creatingArticle.previewElements);
  const IDforArticle = useSelector(state => state.admin.id);

  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {

      if (e.target.getAttribute('data-tag') || e.target.getAttribute('data-space'))
        setIsDragging(false);
      else
        if (isDragging) {
          // проблема, что можем выйти за рамки приложения, исправлю потом
          setTransform({
            x: e.clientX - cursorOffset.x,
            y: e.clientY - cursorOffset.y,
          });
        }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, cursorOffset]);

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setCursorOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);

    setTransform(() => ({
      x: e.clientX - offsetX,
      y: e.clientY - offsetY,
    }));
  };

  const dragStartHandler = (e) => {
    dispatch(addCurrentTagButton(e.target.getAttribute('data-tag')));
  }

  const sendArticle = (e) => {
    e.preventDefault();
    console.log(content);

    request('POST', 'admin/create-article', [...content, IDforArticle]);

    dispatch(changeStatusCreatingArticle(true));

    console.log(e);
  }

  const changeClassText = (e) => {
    dispatch(addCurrentStyleClassText(e.target.value));
  }

  return (
    <div className="cursor-grab w-1/2 absolute"
      style={{

        // тут баг большой, надо исправлять.
        // transform: `translate(${transform.x}px, ${transform.y}px)`,
        top: `${transform.y}px`,
        left: `${transform.x}px`,
        transition: isDragging ? 'none' : 'transform 0.2s ease', // Add transition for smooth movement
      }}
      onMouseDown={handleMouseDown}
    >
      <form
        data-move={true}
        draggable={false}
        className="flex justify-between items-center p-2 bg-blue-700 text-white rounded-xl mb-1 select-none"
        onSubmit={(e) => sendArticle(e)}
      >
        <h3 className="p-2 italic text-xl">
          Panel My Blog
        </h3>
        <div className="inline-flex flex-grow pl-4 text-ba" draggable={false}>
          <select onChange={changeClassText} defaultValue={'default'} className='text-slate-950 p-1 rounded-xl w-36 outline-none'>
            <optgroup label='text size'>
              <option value='default'>text base</option>
              <option value="text-xl">text lg</option>
              <option value="text-xl">text xl</option>
              <option value="text-2xl">text 2xl</option>
            </optgroup>
            <optgroup label='text style'>
              <option value="font-normal">normal</option>
              <option value="italic">italic</option>
              <option value="font-semibold">semi bold</option>
              <option value="font-bold">bold</option>
            </optgroup>
          </select>
        </div>
        <div className="flex gap-2 mr-2" draggable={false}>
          <img src={arrow} alt="arrow back" className="block w-8 p-1 cursor-pointer" draggable={false} />
          <img src={arrow} alt="arrow forward" className="block w-8 p-1 transform scale-x-[-1] cursor-pointer" draggable={false} />
        </div>
        <button

          type="submit"
          className="p-2 bg-white text-slate-600 rounded-xl font-bold active:bg-slate-200"
        >
          Опубликовать
        </button>
      </form>
      <div className="flex">
        {tagsRender.map((tag, key) => {
          if (tag.space) {
            return (
              <button key={key} data-space={tag.tagSpace} className='w-12 cursor-auto' draggable={false}></button>
            )
          } else {
            return (
              <button
                key={key}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e)}
                className='panel__btn'
                title={tag.title}
                data-tag={tag.dataTag}
              >
                {tag.textIntag ? tag.textIntag : <img data-tag={tag.dataTag} src={tag.src} alt={tag.alt} />}
              </button>
            )
          }
        })}
      </div>
    </div>
  );
};

export default PanelTags;