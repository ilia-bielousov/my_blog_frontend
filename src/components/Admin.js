import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../pages/Admin/AdminLayout';
import AdminHome from '../pages/Admin/AdminHome';
import AdminArticles from '../pages/Admin/AdminArticles';
import AdminCreateCard from '../pages/Admin/AdminCreateCard';
import AdminCreateArticle from '../pages/Admin/AdminCreateArticle';
import AdminEdit from '../pages/Admin/AdminEdit';

const Admin = () => {
  return (
    <>
      <Routes>
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
    </>
  );
};

export default Admin;