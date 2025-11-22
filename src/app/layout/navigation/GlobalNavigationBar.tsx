import { useLocation, useNavigate } from 'react-router-dom';
import Home from '@/assets/GNBHomeIcon.svg?react';
import HomeSelected from '@/assets/GNBHomeSelectedIcon.svg?react';
import List from '@/assets/GNBListIcon.svg?react';
import ListSelected from '@/assets/GNBListSelectedIcon.svg?react';
import MyPage from '@/assets/GNBMypageIcon.svg?react';
import MyPageSelected from '@/assets/GNBMypageSelectedIcon.svg?react';

export const GlobalNavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      label: '리스트',
      path: '/list',
      icon: <List />,
      iconSelected: <ListSelected />,
    },
    {
      label: '홈',
      path: '/',
      icon: <Home />,
      iconSelected: <HomeSelected />,
    },
    {
      label: '마이페이지',
      path: '/mypage',
      icon: <MyPage />,
      iconSelected: <MyPageSelected />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-15 bg-white border-t border-neutral-100 flex justify-around z-50">
      {items.map((item) => {
        const selected = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {selected ? item.iconSelected : item.icon}
            </div>

            <span
              className={`text-xs ${selected ? 'text-black font-semibold' : 'text-neutral-400'}`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
