
import { Link } from 'react-router-dom';

import home from './../../assets/images/home.svg'
import article from './../../assets/images/article.svg';
import create from './../../assets/images/create.svg';
import edit from './../../assets/images/edit.svg';

const AdminToolbar = () => {
  return (
    <nav className="fixed z-10 left-0 top-0 h-full w-72 shadow-xl z-10">
      <ul className='flex flex-col'>
        <li className='p-2 transition hover:bg-slate-300'>
          <Link
            to="../admin"
            title="Home"
            className="flex"
            relative="admin"
            key={'admin'}
          >
            <img className='mr-4' src={home} alt="home" />
            <span className="text-xl">Домашняя страница</span>
          </Link>
        </li>
        <li className='p-2 transition hover:bg-slate-300'>
          <Link
            to="create-card"
            title="create an card"
            className="flex"
            key={'create-card'}
          >
            <img className='mr-4' src={create} alt="create" />
            <span className="text-xl">Создание статьи</span>
          </Link>
        </li>
        <li className='p-2 transition hover:bg-slate-300'>
          <Link
            to="edit-article"
            title="edit an article"
            className="flex"
            key={'edit-article'}
          >
            <img className='mr-4' src={edit} alt="edit" />
            <span className="text-xl">Редактировае статьи</span>
          </Link>
        </li>
        <li className='p-2 transition hover:bg-slate-300'>
          <Link
            to="articles"
            title="articles"
            className="flex"
            key={'articles'}
          >
            <img className='mr-4' src={article} alt="article" />
            <span className="text-xl">Аналитика</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminToolbar;

