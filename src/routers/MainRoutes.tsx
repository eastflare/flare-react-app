import { Route } from "react-router-dom";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import Home from "pages/HomePage";
import loadable from "@loadable/component";
import Loading from "components/elements/Loading";

//const Home = loadable(() => import("pages/HomePage"));
const AboutPage = loadable(() => import("pages/sample/AboutPage"), {
  fallback: <Loading />,
});
const ServicesPage = loadable(() => import("pages/sample/ServicesPage"), {
  fallback: <Loading />,
});
const ContactPage = loadable(() => import("pages/sample/ContactPage"), {
  fallback: <Loading />,
});
const Sample1Page = loadable(() => import("pages/sample/Sample1Page"), {
  fallback: <Loading />,
});
const Sample2Page = loadable(() => import("pages/sample/Sample2Page"), {
  fallback: <Loading />,
});
const Sample3Page = loadable(() => import("pages/sample/Sample3Page"), {
  fallback: <Loading />,
});
const Sample4Page = loadable(() => import("pages/sample/Sample4Page"), {
  fallback: <Loading />,
});
const Sample5Page = loadable(() => import("pages/sample/Sample5Page"), {
  fallback: <Loading />,
});
const Sample6Page = loadable(() => import("pages/sample/Sample6Page"), {
  fallback: <Loading />,
});
const NoPage = loadable(() => import("pages/sample/NoPage"), {
  fallback: <Loading />,
});
const MyModal3Page = loadable(() => import("pages/sample/MyModal3Page"), {
  fallback: <Loading />,
});
const GridPage = loadable(() => import("pages/sample/GridPage"), {
  fallback: <Loading />,
});
const FormPage = loadable(() => import("pages/sample/FormPage"), {
  fallback: <Loading />,
});
const MyModal1Page = loadable(() => import("pages/sample/MyModal1Page"), {
  fallback: <Loading />,
});
const MyModal2Page = loadable(() => import("pages/sample/MyModal2Page"), {
  fallback: <Loading />,
});
const MatthewPage = loadable(() => import("pages/sample/MatthewPage"), {
  fallback: <Loading />,
});
const MyModalPage = loadable(() => import("pages/sample/MyModalPage"), {
  fallback: <Loading />,
});
const DeviceDetectPage = loadable(() => import("pages/sample/DeviceDetectPage"), {
  fallback: <Loading />,
});
const PageListPage = loadable(() => import("pages/system/page/PageListPage"), {
  fallback: <Loading />,
});
const LoginLogListPage = loadable(() => import("pages/system/log/LoginLogListPage"), {
  fallback: <Loading />,
});

const MainRoutes = () => {
  return (
    <PageRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/sample/about' element={<AboutPage />} />
      <Route path='/sample/services' element={<ServicesPage />} />
      <Route path='/sample/contact' element={<ContactPage />} />
      <Route path='/sample/sample1' element={<Sample1Page />} />
      <Route path='/sample/sample2' element={<Sample2Page />} />
      <Route path='/sample/sample3' element={<Sample3Page />} />
      <Route path='/sample/sample4/:id' element={<Sample4Page />} />
      <Route path='/sample/sample5/:id/:name' element={<Sample5Page />} />
      <Route path='/sample/sample6' element={<Sample6Page />} />
      <Route path='/sample/matthew' element={<MatthewPage />} />
      <Route path='/sample/my-modal' element={<MyModalPage />} />
      <Route path='/sample/my-modal1' element={<MyModal1Page />} />
      <Route path='/sample/my-modal2' element={<MyModal2Page />} />
      <Route path='/sample/my-modal3' element={<MyModal3Page />} />
      <Route path='/sample/device-detect' element={<DeviceDetectPage />} />
      <Route path='/sample/grid' element={<GridPage />} />
      <Route path='/sample/form' element={<FormPage />} />
      <Route path='/system/page/page-list' element={<PageListPage />} />
      <Route path='/system/page/login-log-list' element={<LoginLogListPage />} />
      <Route path='*' element={<NoPage />} />
    </PageRoutes>
  );
};

export default MainRoutes;
