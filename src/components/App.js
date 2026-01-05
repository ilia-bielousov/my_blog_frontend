import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import PageForCards from '../pages/Client/PageForCards';
import PageTransition from './PageTransition';
import SinglePageForArticle from '../pages/Client/SinglePageForArticle';
import Review from '../pages/Admin/Review';
import Client404 from '../pages/Client/Client404';
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminHome from '../pages/Admin/AdminHome';
import AdminDrafts from '../pages/Admin/AdminDrafts';
import AdminArticles from '../pages/Admin/AdminArticles';
import AdminEditCards from '../pages/Admin/AdminEditCards';
import CreatingCard from '../pages/Admin/CreatingCard/CreatingCard';
import CreatingArticle from '../pages/Admin/CreatingArticle/CreatingArticle';
import AdminEdit from '../pages/Admin/AdminEdit';
import EditingArticle from '../pages/Admin/EditingArticle/EditingArticle';
import EditingCard from '../pages/Admin/EditingCard/EditingCard';
import Admin404 from '../pages/Admin/Admin404';

const App = () => {
  return (
    <>
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
          {/* Пример где-то в твоих роутах */}
          <Route path="drafts" element={<AdminDrafts />} />
          <Route path='create-article' element={<CreatingArticle />} />
          <Route path='edit-cards' element={<AdminEditCards />} />
          <Route path='edit-cards/:pseudoName' element={<EditingCard />} />
          <Route path='edit-article' element={<AdminEdit />} />
          <Route path='edit-article/:id' element={<EditingArticle />} />
          <Route path='*' element={<Admin404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
