import { Outlet } from 'react-router-dom';

import AdminToolbar from './components/AdminToolbar';
import Footer from '../../components/Footer';

const AdminLayout = () => {

  return (
    <>
      <AdminToolbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default AdminLayout;