import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Modals from 'components/cmn/Layout/Modals';
import { Suspense } from 'react';
import Loading from 'components/elements/Loading';
import SSOLoginRouter from 'routers/SSOLoginRouter';
import LoginRouter from 'routers/LoginRouter';
import FailRouter from 'routers/FailRouter';
import MainRouter from 'routers/MainRouter';

const App = () => {
  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/ssoLogin' element={<SSOLoginRouter />} />
              <Route path='/login' element={<LoginRouter />} />
              <Route path='/fail/:message' element={<FailRouter />} />
              <Route path='/*' element={<MainRouter />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
      <ToastContainer />
      <Modals />
    </>
  );
};

export default App;
