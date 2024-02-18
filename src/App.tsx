import Navbar from './components/Navbar';
import { useAuth, AuthProvider } from './components/use-auth-client';
import { Outlet } from 'react-router-dom';

function App() {
  const { identity } = useAuth();

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
