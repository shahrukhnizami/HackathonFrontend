"use_client"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './/App.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Layout from './layout/layout.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import Login from './pages/Login.jsx';
import AgentLayout from './layout/AgentLayout.jsx';
import Properties from './pages/Benificary.jsx';
import Tasks from './pages/Tasks.jsx';
import Register from './pages/Register.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { AgentDashboard } from './pages/Agent/AgentDashBoard.jsx';
import { UserDashboard } from './pages/User/UserDashBoard.jsx';
import UserLayout from '../src/layout/UserLayout';
import Users from './pages/Admin/Users.jsx';
import ReceptionistDashboard from './pages/Receptionist/ReceptionistDashboard.jsx';
import ReseptionLayout from './layout/ReseptionLayout.jsx';
import Beneficiary from './pages/Benificary.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/admin',
        element: <Layout />,
        children: [
          { path: '/admin', element: <Dashboard /> },
          { path: 'users', element: <Users /> },
          { path: 'contact', element: <ContactUs /> },
          { path: 'beneficiary', element: <Beneficiary /> },
        ],
      },
      {
        path: '/agent',
        element: <AgentLayout />,
        children: [
          { path: '/agent', element: <AgentDashboard /> },
          { path: '/agent/properties', element: <Properties /> },
          { path: '/agent/tasks', element: <Tasks /> },
        ],
      },
      {
        path: '/user',
        element: <UserLayout />,
        children: [
          { path: '/user', element: <UserDashboard /> },
          { path: '/user/properties', element: <Properties /> },
          { path: '/user/tasks', element: <Tasks /> },
        ],
      },
      {
        path: '/reception',
        element: <ReseptionLayout />,
        children: [
          { path: '/reception', element: <ReceptionistDashboard /> },
          { path: '/reception/benificary', element: <Properties /> },
          { path: '/reception/tasks', element: <Tasks /> },
        ],
      },
    ],
    
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>)