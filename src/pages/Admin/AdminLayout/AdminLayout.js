import { Outlet } from 'react-router-dom';

import AdminHeader from '../components/AdminHeader/AdminHeader';
import Footer from '../../../components/Footer/Footer';

const AdminLayout = () => {

  return (
    <>
      <AdminHeader />

      <Outlet />

      <Footer />
    </>
  );
}

export default AdminLayout;