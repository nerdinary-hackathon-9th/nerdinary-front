
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

function App() {


  // useEffect(() => {
  //   const userId = localStorage.getItem('userId');

  //   const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  //   if (!userId && !isAuthPage) {
  //     window.location.replace('/login');
  //   }
  // }, [location.pathname]);

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
