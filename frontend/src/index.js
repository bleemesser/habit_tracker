import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Link } from 'react-router-dom';
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
import SleepForm from './components/SleepForm';
import FeelingsForm from './components/FeelingsForm';
import ContextWrapper from './components/calendarContext/ContextWrapper';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ContextWrapper>
  <BrowserRouter>
    <Routes>
      <Route path="/" element= {<LayoutsWithNavbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/t/dashboard" element={<TeacherDashboard />} />
        <Route path="/procrastination" element={<ProcrastinationForm />} />
        <Route path="/sleep" element={<SleepForm />} />
        <Route path="/feelings" element={<FeelingsForm />} />
        <Route path="/s/dashboard" element={<StudentDashboard />} />
      </Route>
      <Route path="*" element={
        <p>Uh oh! It looks like you lost your way :D </p>
        } />
    </Routes>
  </BrowserRouter>
  </ContextWrapper>
);

function LayoutsWithNavbar() {
  return (
    <>
      <Navigator />
      <Outlet />
    </>
  );
}
