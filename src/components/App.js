import { Routes, Route } from 'react-router-dom';

import Layout from './Layout.js/Layout';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import SingleProject from '../pages/SingleProject';
import SingleModeling from '../pages/SingleModeling';
import Modeling from '../pages/Modeling';
import PageTransition from './PageTransition/PageTransition';
// import Admin from '../pages/Admin/Admin';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index  element={
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
        </Route>
        {/* <Route path='/admin' element={<Admin />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
