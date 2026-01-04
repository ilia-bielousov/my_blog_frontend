import { Outlet } from 'react-router-dom';

import Header from "./Header";
import Footer from './Footer';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout;