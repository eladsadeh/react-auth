import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import { Page1, loader } from './routes/Page1';
import { Page2 } from './routes/Page2';
import { Page3 } from './routes/Page3';
import { RootA } from './routes/RootA';
import { RootB } from './routes/RootB';
import { Projects } from './routes/Projects';
import { NoNav } from './routes/NoNav';

import ErrorPage from './error-page';

import Index from './routes/index';

import './index.css';
import { About } from './routes/About';
import { TabA } from './routes/TabA';

const router = createBrowserRouter([
  {
    // path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: '/dashboard',
            element: <Projects />,
          },
          {
            path: '/dashboard/:pKey/*',
            element: <Page1 />,
            loader: loader,
            children: [
              {
                path: 'team',
                element: <About />,
              },
              {
                path: 'tabA',
                element: <TabA />,
              },
            ],
          },
          {
            path: '/settings/:pKey',
            element: <Page2 />,
          },
          {
            path: '/translations/:pKey',
            element: <Page3 />,
          },
        ],
      },
    ],
  },
  {
    element: <NoNav />,
    children: [
      {
        path: '/rootA',
        element: <RootA />,
      },
      {
        path: '/rootB',
        element: <RootB />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
