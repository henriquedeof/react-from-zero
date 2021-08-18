import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
    //Acredito que <BrowserRouter> deveria estar em <Routes>
  return (
      //Todas as informacoes existentes no <AuthProvider>, serao passadas para o restante dos componentes filhos.
      <AuthProvider>
          <BrowserRouter>
              <ToastContainer autoClose={3000} />
              <Routes/>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
