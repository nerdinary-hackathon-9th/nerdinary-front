import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/page/home/HomePage';

import LoginPage from '@/page/auth/ui/LoginPage';
import SignUpPage from '@/page/auth/ui/SignUpPage';
import MakeChallengePage from '@/page/makeChallenge/MakeChallengePage';
import JoinChallengePage from '@/page/joinChallenge/JoinChallengePage';
import ChallengeDetailPage from '@/page/challengeDetail/ChallengeDetailPage';

import App from '../App';

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '', element: <HomePage /> },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'signup',
          element: <SignUpPage />,
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
          path: 'challenge-detail/:id',
          element: <ChallengeDetailPage />,
        },
        {
          
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
