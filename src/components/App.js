import { Routes, Route } from 'react-router-dom';

import Layout from './Layout.js/Layout';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Modeling from '../pages/Modeling';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='projects' element={<Projects />}></Route>
          <Route path='modeling' element={<Modeling />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
