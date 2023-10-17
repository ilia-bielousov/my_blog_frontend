import { Outlet } from 'react-router-dom';

import AdminToolbar from '../AdminToolbar/AdminToolbar';
import Footer from '../../../components/Footer/Footer';

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