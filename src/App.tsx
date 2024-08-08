import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "components/elements/Loading";
import loadable from "@loadable/component";
import LoginRouter from "routers/LoginRouter";

const SSOLoginRouter = loadable(() => import("routers/SSOLoginRouter"));
// const LoginRouter = loadable(() => import("routers/LoginRouter"));
const FailRouter = loadable(() => import("routers/FailRouter"));
const MainRouter = loadable(() => import("routers/MainRouter"));

const App = () => {
  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path='/ssoLogin' element={<SSOLoginRouter />} />
            <Route path='/login' element={<LoginRouter />} />
            <Route path='/fail/:message' element={<FailRouter />} />
            <Route path='/*' element={<MainRouter fallback={<Loading />} />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
