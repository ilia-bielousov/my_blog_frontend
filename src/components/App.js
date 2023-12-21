import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import PageForCards from '../pages/PageForCards';
import PageTransition from './PageTransition';
import SinglePageForArticle from '../pages/SinglePageForArticle';
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminHome from '../pages/Admin/AdminHome';
import AdminArticles from '../pages/Admin/AdminArticles';
import AdminCreateCard from '../pages/Admin/AdminCreateCard';
import AdminCreateArticle from '../pages/Admin/AdminCreateArticle';
import AdminEdit from '../pages/Admin/AdminEdit';

import './App.css';

const App = () => {
  return (
    <div className="App flex flex-col flex-1">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path='programming' element={
            <PageTransition>
              <PageForCards />
            </PageTransition>
          } />
          <Route path='programming/:id' element={
            <PageTransition>
              <SinglePageForArticle />
            </PageTransition>
          } />
          <Route path='projects' element={
            <PageTransition>
              <PageForCards />
            </PageTransition>
          } />
          <Route path='projects/:id' element={
            <PageTransition>
              <SinglePageForArticle />
            </PageTransition>
          } />
          <Route path='modeling' element={
            <PageTransition>
              <PageForCards />
            </PageTransition>
          } />
          <Route path='modeling/:id' element={
            <PageTransition>
              <SinglePageForArticle />
            </PageTransition>
          } />
        </Route>
        <Route path='/admin/*' element={<AdminLayout />}>
          <Route index element={
            <AdminHome />
          } />
          <Route path='articles' element={<AdminArticles />} />
          <Route path='create-card' element={<AdminCreateCard />} />
          <Route path='create-article' element={<AdminCreateArticle />} />
          <Route path='edit-article' element={<AdminEdit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
