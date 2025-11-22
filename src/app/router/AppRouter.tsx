import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/page/home/HomePage';
import TestPage from '@/page/test/TestPage';
import MakeChallengePage from '@/page/makeChallenge/MakeChallengePage';

import App from '../App';

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '', element: <HomePage /> },
        {
          path: 'test',
          element: <TestPage />,
        },
        {
          path: 'make-new-challenge',
          element: <MakeChallengePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
