import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/page/home/HomePage';
import LoginPage from '@/page/auth/ui/LoginPage';
import SignUpPage from '@/page/auth/ui/SignUpPage';
import MakeChallengePage from '@/page/makeChallenge/MakeChallengePage';
import JoinChallengePage from '@/page/joinChallenge/JoinChallengePage';
import ChallengeDetailPage from '@/page/challengeDetail/ChallengeDetailPage';
import CreateSnapPage from '@/page/createSnap/CreateSnapPage';
import MyPage from '@/page/mypage/MyPage';
import ChallengeListPage from '@/page/challengeList/ChallengeListPage';

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
          path: 'challenge-detail/:id/join',
          element: <JoinChallengePage />,
        },
        {
          path: 'challenge-detail/:challengeId/create-snap',
          element: <CreateSnapPage />,
        },
        {
          // Todo : api endpoint에 맞춰 path 수정해야 함!
          path: 'challenge-detail/:id',
          element: <ChallengeDetailPage />,
        },
        {
          path: 'mypage',
          element: <MyPage />,
        },
        {
          path: 'challenge-list',
          element: <ChallengeListPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
