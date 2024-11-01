import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
// import Home from '../pages/Home';
import PageForCards from '../pages/PageForCards';
import PageTransition from './PageTransition';
import SinglePageForArticle from '../pages/SinglePageForArticle';
import Review from '../pages/Review';
import Client404 from '../pages/Client404';
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminHome from '../pages/Admin/AdminHome';
import AdminArticles from '../pages/Admin/AdminArticles';
import CreatingCard from '../pages/Admin/CreatingCard/CreatingCard';
import AdminCreateArticle from '../pages/Admin/AdminCreateArticle';
import AdminEdit from '../pages/Admin/AdminEdit';
import AdminEditSingleArticle from '../pages/Admin/AdminEditSingleArticle';
import Admin404 from '../pages/Admin/Admin404';

const App = () => {
  return (
    <div className="App flex flex-col flex-1">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={
            <PageTransition>
              <PageForCards />
            </PageTransition>
          } />
          <Route path='*' element={
            <PageTransition>
              <Client404 />
            </PageTransition>
          } />
          <Route path='programming' element={
            <PageTransition>
              <PageForCards />
            </PageTransition>
          } />
          <Route path='programming/error404' element={
            <PageTransition>
              <Client404 />
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
          <Route path='projects/error404' element={
            <PageTransition>
              <Client404 />
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
          <Route path='modeling/error404' element={
            <PageTransition>
              <Client404 />
            </PageTransition>
          } />
          <Route path='modeling/:id' element={
            <PageTransition>
              <SinglePageForArticle />
            </PageTransition>
          } />
          <Route path='preview' element={
            <PageTransition>
              <Review />
            </PageTransition>
          } />
        </Route>
        <Route path='/admin/*' element={<AdminLayout />}>
          <Route index element={
            <AdminHome />
          } />
          <Route path='articles' element={<AdminArticles />} />
          <Route path='create-card' element={<CreatingCard />} />
          <Route path='create-article' element={<AdminCreateArticle />} />
          <Route path='edit-article' element={<AdminEdit />} />
          <Route path='edit-article/:id' element={<AdminEditSingleArticle />} />
          <Route path='*' element={<Admin404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
