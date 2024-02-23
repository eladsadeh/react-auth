import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';

import ErrorPage from './error-page';
import PeopleError from './people-error';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import Index from './routes/index';
import { action as destroyAction } from './routes/destroy';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
            children: [
              {
                path: 'edit',
                element: <EditContact />,
                loader: contactLoader,
                action: editAction,
              },
              {
                path: 'destroy',
                action: destroyAction,
                errorElement: <div>Oops! There was an error.</div>,
              },
            ],
          },
        ],
      },
      {
        errorElement: <PeopleError />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'people/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
            // errorElement: <ErrorPage />,
          },
          {
            path: 'people/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'people/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
