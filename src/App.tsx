import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import Loading from "components/elements/Loading";

const SSOLoginRouter = lazy(() => import("routers/SSOLoginRouter"));
const LoginRouter = lazy(() => import("routers/LoginRouter"));
const FailRouter = lazy(() => import("routers/FailRouter"));
const MainRouter = lazy(() => import("routers/MainRouter"));

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
    </>
  );
};

export default App;
