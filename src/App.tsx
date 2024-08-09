import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "components/elements/Loading";
import loadable from "@loadable/component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import LoginRouter from "routers/LoginRouter";
import { CookiesProvider } from "react-cookie";
import { MenuProvider } from "provider/menu-provider";

const SSOLoginRouter = loadable(() => import("routers/SSOLoginRouter"));
const LoginRouter = loadable(() => import("routers/LoginRouter"));
const FailRouter = loadable(() => import("routers/FailRouter"));
const MainRouter = loadable(() => import("routers/MainRouter"));

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <CookiesProvider>
            <QueryClientProvider client={queryClient}>
              <MenuProvider>
                <Routes>
                  <Route path='/ssoLogin' element={<SSOLoginRouter />} />
                  <Route path='/login' element={<LoginRouter />} />
                  <Route path='/fail/:message' element={<FailRouter />} />
                  <Route path='/*' element={<MainRouter fallback={<Loading />} />} />
                </Routes>
              </MenuProvider>
            </QueryClientProvider>
          </CookiesProvider>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
