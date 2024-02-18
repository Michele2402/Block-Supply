import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Interface from './components/companyInterface/Interface';
import RequestDetails from './components/companyInterface/Request';
import TransportationInterface from './components/companyInterface/TransportationInterface';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: '', element: <HomePage></HomePage> },
      { path: '/register', element: <Register></Register> },
      {
        path: '/companyInterface/:id',
        element: <Interface></Interface>,
      },
      {
        path: '/transportationCompanyInterface/:id',
        element: <TransportationInterface></TransportationInterface>,
      },
      { path: '/request/:id', element: <RequestDetails></RequestDetails> },
    ],
  },
]);

export default router;
