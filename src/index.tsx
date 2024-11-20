import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { SettingsProvider } from './components/SettingsProvider';
import RedirectToLogin from './components/RedirectToLogin';
import Root from './routes/Root';
import SearchRedirect from './routes/SearchRedirect';
import Settings from './routes/Settings';
import NotFound from './routes/NotFound';

import './global-styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/search",
    element: <SettingsProvider><SearchRedirect /></SettingsProvider>
  },
  {
    path: "/settings",
    element: <SettingsProvider><Settings /></SettingsProvider>
  },
  {
    path: "/login",
    element: <RedirectToLogin />
  },
  {
    path: "/",
    element: <SettingsProvider><Root /></SettingsProvider>,
    errorElement: <NotFound />
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
