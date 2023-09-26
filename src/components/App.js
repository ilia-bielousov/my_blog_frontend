import { Routes, Route } from 'react-router-dom';

import Layout from './Layout.js/Layout';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import SingleProject from '../pages/SingleProject';
import SingleModeling from '../pages/SingleModeling';
import Modeling from '../pages/Modeling';
import Art from '../pages/Art';
import PageTransition from './PageTransition/PageTransition';
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminHome from '../pages/Admin/AdminHome';
import AdminCreateArticle from '../pages/Admin/components/AdminCreateArticle/AdminCreateArticle';
import AdminEdit from '../pages/Admin/AdminEdit';

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
          <Route path='create-article' element={<AdminCreateArticle />}/>
          <Route path='edit-article' element={<AdminEdit />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
