import { Route, Routes } from "react-router-dom";

import Layout from './Layout';
import Home from '../pages/Home';
import PageForCards from '../pages/PageForCards';
import PageTransition from './PageTransition';
import SinglePageForArticle from '../pages/SinglePageForArticle';

const Client = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path='programming' element={
          <PageTransition>
            <PageForCards />
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
        <Route path='modeling/:id' element={
          <PageTransition>
            <SinglePageForArticle />
          </PageTransition>
        } />
      </Route>
    </Routes>
  );
};

export default Client;