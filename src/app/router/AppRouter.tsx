import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/page/home/HomePage';
import TestPage from '@/page/test/TestPage';

import Login from '@/page/auth/Login';
import SignUp from '@/page/auth/SignUp';
import MakeChallengePage from '@/page/makeChallenge/MakeChallengePage';
import JoinChallengePage from '@/page/joinChallenge/JoinChallengePage';
import ChallengeDetailPage from '@/page/challenge/ChallengeDetail';

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
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
        {
          path: 'make-new-challenge',
          element: <MakeChallengePage />,
        },
        {
          path: 'join-challenge',
          element: <JoinChallengePage />,
        },
        {
          // Todo : api endpoint에 맞춰 path 수정해야 함!
          path: 'challenge',
          element: <ChallengeDetailPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
