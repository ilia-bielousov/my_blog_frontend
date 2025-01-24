import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentTagButton, changeStatusCreatingArticle, updateReviewContentAnArticle, setStatusClickPanelTags } from '../../../../store/adminActions';
import axios from 'axios';

// images
import list from './../../../../assets/images/list.svg';
import paragraph from './../../../../assets/images/paragraph.svg';
import picture from './../../../../assets/images/picture.svg';
import video from './../../../../assets/images/video.svg';
import code from './../../../../assets/images/code.svg';

// данные для генерации тегов
const tagsRender = [
  { title: 'добавить заголовок 1 уровня', dataTag: 'h1', textIntag: 'H1' },
  { title: 'добавить заголовок 2 уровня', dataTag: 'h2', textIntag: 'H2' },
  { title: 'добавить заголовок 3 уровня', dataTag: 'h3', textIntag: 'H3' },
  { title: 'добавить список', dataTag: 'ul', src: list, alt: 'list' },
  { title: 'добавить параграф', dataTag: 'p', src: paragraph, alt: 'paragraph' },
  { tagSpace: true, space: true },
  { title: 'добавить картинку', dataTag: 'img', src: picture, alt: 'download' },
  { title: 'добавить видео', dataTag: 'iframe', src: video, alt: 'video' },
  { tagSpace: true, space: true },
  { title: 'добавить код', dataTag: 'code', src: code, alt: 'code' },
];

const PanelTags = ({ setModalActive }) => {
  const dispatch = useDispatch();
  const content = useSelector(state => state.admin.creatingArticle.previewElements);
  const IDforArticle = useSelector(state => state.admin.id);

  const panelRef = useRef(null);
  const [position, setPosition] = useState({ x: 125, y: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [idPreview, setIdPreview] = useState(null);


  // какой-то баг, то что оно прыгает.
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: Math.min(window.innerWidth - 540, Math.max(10, e.clientX - dragOffset.x)),
          y: Math.min(document.documentElement.scrollHeight - 122, Math.max(10, e.clientY - dragOffset.y)),
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
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e) => {
    if (e.target === panelRef.current || e.target.dataset.move === "true") {
      const rect = panelRef.current.getBoundingClientRect();
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    }
  };

  const dragStartHandler = (e) => {
    dispatch(addCurrentTagButton(e.target.getAttribute('data-tag')));
    dispatch(setStatusClickPanelTags(true));
  };

  const handlePreviewArticle = async (e) => {
    updateClassName();
    if (idPreview) {
      await axios.patch(`${process.env.REACT_APP_API_URL}admin/preview`, { _id: idPreview.id, content: [...content] })
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}admin/preview`, [...content])
        .then(res => {
          setIdPreview(res.data);
        })
    }
  }

  const updateClassName = () => {
    content.forEach(item => {
      switch (item.tag) {
        case 'h1':
          item.className = 'text-3xl font-bold mb-5 max-md:text-2xl';
          break;
        case 'h2':
          item.className = 'text-2xl font-bold mb-4 max-md:text-xl';
          break;
        case 'h3':
          item.className = 'text-xl mb-3 max-md:text-lg';
          break;
        // case 'ul':
        //   item.className = '';
        //   break;
        case 'p':
          item.className = 'text-justify indent-12 mb-3';
          break;
        case 'img':
          item.className = '"mx-auto p-3';
          break;
        // case 'code':
        //   item.className = '';
        //   break;

        default: { }
      }
    });
    dispatch(updateReviewContentAnArticle(content));
  }

  const sendArticle = async (e) => {
    e.preventDefault();
    setModalActive({ open: true, loading: true, error: false });

    updateClassName();
    if (idPreview && idPreview.id) {
      await axios.delete(`${process.env.REACT_APP_API_URL}admin/preview/${idPreview.id}`);
    }

    await axios.post(`${process.env.REACT_APP_API_URL}admin/create-article`, [...content, IDforArticle])
      .then(async (res) => {
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
    <div
      ref={panelRef}
      className="cursor-grab w-[530px] absolute z-20"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transition: isDragging ? 'none' : 'transform 0.2s ease',
      }}
      onMouseDown={handleMouseDown}
    >
      <form
        data-move={true}
        draggable={false}
        className="flex justify-between items-center p-2 bg-blue-700 text-white rounded-xl mb-1 select-none"
        onSubmit={(e) => sendArticle(e)}
      >
        <h3 className="p-2 italic text-xl" data-move={true}>
          Панель тегов
        </h3>
        <div className='flex gap-3'>
          <a
            onClick={handlePreviewArticle}
            href='./../preview'
            target='_blank'
            type="submit"
            className="p-2 bg-white text-slate-600 rounded-xl font-bold active:bg-slate-200"
            draggable={false}
          >
            Предпросмотр
          </a>
          <button
            type="submit"
            className="p-2 bg-white text-slate-600 rounded-xl font-bold active:bg-slate-200"
            draggable={false}
          >
            Опубликовать
          </button>
        </div>
      </form>
      <div className="flex justify-between">
        {tagsRender.map((tag, key) => {
          if (tag.space) {
            return (
              <button key={key} data-space={tag.tagSpace} className='w-14 cursor-auto' draggable={false}></button>
            )
          }
          else {
            return (
              <button
                key={key}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e)}
                className={tagsRender.length - 1 === key ? 'panel__btn !mr-0' : 'panel__btn'}
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