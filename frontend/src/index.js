import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import './index.css';
import LoginPage from './LoginPage';
import StudentDashboard from './components/StudentDashboard';
import './assets/css/Navbar-Centered-Brand-icons.css'
import './assets/bootstrap/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import Navigator from "./components/Navigator.js"
import Home from "./components/Home.js"
import TeacherDashboard from "./components/TeacherDashboard.js"
import ProcrastinationForm from './components/ProcrastinationForm';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element= {<LayoutsWithNavbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/t/dashboard" element={<TeacherDashboard />} />
        <Route path="/procrastination" element={<ProcrastinationForm />} />
        <Route path="/s/dashboard" element={<StudentDashboard />} />
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
      <Navigator />
      <Outlet />
    </>
  );
}
