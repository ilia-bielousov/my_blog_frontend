import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentTagButton, changeStatusCreatingArticle, setStatusClickPanelTags } from '../../../store/adminActions';

import axios from 'axios';

// images
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
  dataTag: 'iframe',
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

const PanelTags = ({ setModalActive }) => {
  const dispatch = useDispatch();

  const content = useSelector(state => state.admin.creatingArticle.previewElements);
  const IDforArticle = useSelector(state => state.admin.id);

  const [transform, setTransform] = useState({ x: 125, y: 300 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.target.getAttribute('data-tag') || e.target.getAttribute('data-space'))
        setIsDragging(false);
      else if (isDragging) {
        setTransform((prevPosition) => ({
          x: Math.min(window.innerWidth - 466, Math.max(0, prevPosition.x + e.movementX)),
          y: Math.min(document.documentElement.scrollHeight - 128, Math.max(0, prevPosition.y + e.movementY)),
        }));
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
  }, [isDragging]);

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let offsetY = e.clientY - rect.top;

    setIsDragging(true);

    setTransform(() => ({
      x: e.clientX - offsetX,
      y: e.clientY + window.scrollY - offsetY,
    }));
  };

  const dragStartHandler = (e) => {
    dispatch(addCurrentTagButton(e.target.getAttribute('data-tag')));
    dispatch(setStatusClickPanelTags(true));
  }

  const sendArticle = async (e) => {
    e.preventDefault();
    setModalActive({ open: true, loading: true, error: false })

    await axios.post(`http://${process.env.REACT_APP_API_URL}/admin/create-article`, [...content, IDforArticle])
      .then(res => {
        if (res.data.status === 200) {
          setModalActive({ open: true, loading: false, error: false });
        }
      })
      .catch(err => {
        if (err.response.data.status === 500) {
          setModalActive({ open: true, loading: false, error: true });
        }
      });

    dispatch(changeStatusCreatingArticle(true));
  }

  return (
    <div className="cursor-grab w-[450px] absolute z-20"
      style={{
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