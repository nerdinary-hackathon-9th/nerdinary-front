import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    if (!userId && !isAuthPage) {
      navigate('/login');
    }
  }, [location.pathname]);

  return (
    <>
      <main>
        <Outlet />
        <Toaster position="bottom-center" />
      </main>
    </>
  );
}

export default App;
