import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './routes/Root';
import SearchRedirect from './routes/SearchRedirect';
import NotFound from './routes/NotFound';

import './global-styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/search",
    element: <SearchRedirect />
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
