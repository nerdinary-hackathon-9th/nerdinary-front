import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './layout/header/ui/Header';

function App() {
  const location = useLocation();

  const headerVariant = (() => {
    if (location.pathname === '/') return 'logo'; // 홈
    if (location.pathname.startsWith('/test')) return 'back-text';
    return 'none';
  })();
  const headerTitle = (() => {
    if (location.pathname === '/') return 'none'; // 홈
    if (location.pathname.startsWith('/test')) return '낭비 목록';
    return 'none';
  })();

  return (
    <>
      {headerVariant !== 'none' && <Header variant={headerVariant} title={headerTitle} />}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
