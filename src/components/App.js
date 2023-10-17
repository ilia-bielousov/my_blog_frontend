import { Routes, Route } from 'react-router-dom';

import Layout from './Layout.js/Layout';
import Home from '../pages/Home';
import Programming from '../pages/PagesForCards/Programming';
import Projects from '../pages/PagesForCards/Projects';
import Modeling from '../pages/PagesForCards/Modeling';
import Art from '../pages/PagesForCards/Art';
import SingleProject from '../pages/SinglePagesForArticle/SingleProject';
import SingleModeling from '../pages/SinglePagesForArticle/SingleModeling';
import PageTransition from './PageTransition/PageTransition';
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
              <Programming />
            </PageTransition>
          } />
          <Route path='projects' element={
            <PageTransition>
              <Projects />
            </PageTransition>
          } />
          <Route path='projects/:id' element={
            <PageTransition>
              <SingleProject />
            </PageTransition>
          } />
          <Route path='modeling' element={
            <PageTransition>
              <Modeling />
            </PageTransition>
          } />
          <Route path='modeling/:id' element={
            <PageTransition>
              <SingleModeling />
            </PageTransition>
          } />
          <Route path='art' element={
            <PageTransition>
              <Art />
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
