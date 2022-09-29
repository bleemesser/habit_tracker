import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import './index.css';
import LoginPage from './LoginPage';

import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import {NavBar} from "./components/NavBar.js"
import Home from "./components/Home.js"

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element= {<LayoutsWithNavbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={
        <p>Uh oh! It looks like you lost your way :D </p>
        } />
    </Routes>
  </BrowserRouter>
);

function LayoutsWithNavbar() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
