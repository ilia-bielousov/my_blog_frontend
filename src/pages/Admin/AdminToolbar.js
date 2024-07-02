import { Link } from 'react-router-dom';

import home from './../../assets/images/home.svg'
import article from './../../assets/images/article.svg';
import create from './../../assets/images/create.svg';
import edit from './../../assets/images/edit.svg';

const AdminToolbar = () => {
  return (
    <nav className="fixed left-0 top-0 h-full w-72 shadow-xl z-10">
      <ul className='flex flex-col'>
        <li className='transition hover:bg-slate-300'>
          <a
            className='flex p-2 text-3xl justify-center'
            target='_blank'
            href="./../"
          >
            Blog page
          </a>
        </li>
        <li className='transition hover:bg-slate-300'>
          <Link
            to="../admin"
            title="Home"
            className="flex p-2"
            relative="admin"
            key={'admin'}
          >
            <img className='mr-4' src={home} alt="home" />
            <span className="text-xl">Strona główna</span>
          </Link>
        </li>
        <li className='transition hover:bg-slate-300'>
          <Link
            to="create-card"
            title="create an card"
            className="flex p-2"
            key={'create-card'}
          >
            <img className='mr-4' src={create} alt="create" />
            <span className="text-xl">Tworzenie artykułu</span>
          </Link>
        </li>
        <li className='transition hover:bg-slate-300'>
          <Link
            to="edit-article"
            title="edit an article"
            className="flex p-2"
            key={'edit-article'}
          >
            <img className='mr-4' src={edit} alt="edit" />
            <span className="text-xl">Edycja artykułu</span>
          </Link>
        </li>
        <li className='transition hover:bg-slate-300'>
          <Link
            to="articles"
            title="articles"
            className="flex p-2"
            key={'articles'}
          >
            <img className='mr-4' src={article} alt="article" />
            <span className="text-xl">Analiza</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminToolbar;

