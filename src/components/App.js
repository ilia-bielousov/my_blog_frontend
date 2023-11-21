import { Routes, Route } from 'react-router-dom';

import Layout from './Layout.js/Layout';
import Home from '../pages/Home';
import PageForCards from '../pages/PageForCards/PageForCards';
import PageTransition from './PageTransition/PageTransition';
import SinglePageForArticle from '../pages/SinglePageForArticle/SinglePageForArticle';
import AdminLayout from '../pages/Admin/AdminLayout/AdminLayout';
import AdminHome from '../pages/Admin/AdminHome/AdminHome';
import AdminCreateArticle from '../pages/Admin/AdminCreateArticle/AdminCreateArticle';
import AdminCreateCard from '../pages/Admin/AdminCreateCard/AdminCreateCard';
import AdminEdit from '../pages/Admin/AdminEdit/AdminEdit';


import './App.css';
import './normalize.css';

const App = () => {
  return (
    <div className="App">
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
          <Route path='create-card' element={<AdminCreateCard />} />
          <Route path='create-article' element={<AdminCreateArticle />} />
          <Route path='edit-article' element={<AdminEdit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
