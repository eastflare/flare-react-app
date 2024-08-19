import { Route } from "react-router-dom";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import Home from "pages/HomePage";
import loadable from "@loadable/component";
import Loading from "components/elements/Loading";

//const Home = loadable(() => import("pages/HomePage"));
const AboutPage = loadable(() => import("pages/AboutPage"), {
  fallback: <Loading />,
});
const ServicesPage = loadable(() => import("pages/ServicesPage"), {
  fallback: <Loading />,
});
const ContactPage = loadable(() => import("pages/ContactPage"), {
  fallback: <Loading />,
});
const Sample1Page = loadable(() => import("pages/Sample1Page"), {
  fallback: <Loading />,
});
const Sample2Page = loadable(() => import("pages/Sample2Page"), {
  fallback: <Loading />,
});
const Sample3Page = loadable(() => import("pages/Sample3Page"), {
  fallback: <Loading />,
});
const Sample4Page = loadable(() => import("pages/Sample4Page"), {
  fallback: <Loading />,
});
const Sample5Page = loadable(() => import("pages/Sample5Page"), {
  fallback: <Loading />,
});
const Sample6Page = loadable(() => import("pages/Sample6Page"), {
  fallback: <Loading />,
});
const NoPage = loadable(() => import("pages/NoPage"), {
  fallback: <Loading />,
});
const MyModal3Page = loadable(() => import("pages/smpl/poup/MyModal3Page"), {
  fallback: <Loading />,
});
const GridPage = loadable(() => import("pages/GridPage"), {
  fallback: <Loading />,
});
const FormPage = loadable(() => import("pages/FormPage"), {
  fallback: <Loading />,
});
const MyModal1Page = loadable(() => import("pages/smpl/poup/MyModal1Page"), {
  fallback: <Loading />,
});
const MyModal2Page = loadable(() => import("pages/smpl/poup/MyModal2Page"), {
  fallback: <Loading />,
});
const MatthewPage = loadable(() => import("pages/smpl/poup/MatthewPage"), {
  fallback: <Loading />,
});
const MyModalPage = loadable(() => import("pages/smpl/poup/MyModalPage"), {
  fallback: <Loading />,
});
const DeviceDetectPage = loadable(() => import("pages/DeviceDetectPage"), {
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
      <Route path='/about' element={<AboutPage />} />
      <Route path='/services' element={<ServicesPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/sample1' element={<Sample1Page />} />
      <Route path='/sample2' element={<Sample2Page />} />
      <Route path='/sample3' element={<Sample3Page />} />
      <Route path='/sample4/:id' element={<Sample4Page />} />
      <Route path='/sample5/:id/:name' element={<Sample5Page />} />
      <Route path='/sample6' element={<Sample6Page />} />
      <Route path='/matthew' element={<MatthewPage />} />
      <Route path='/my-modal' element={<MyModalPage />} />
      <Route path='/my-modal1' element={<MyModal1Page />} />
      <Route path='/my-modal2' element={<MyModal2Page />} />
      <Route path='/my-modal3' element={<MyModal3Page />} />
      <Route path='/device-detect' element={<DeviceDetectPage />} />
      <Route path='/grid' element={<GridPage />} />
      <Route path='/form' element={<FormPage />} />
      <Route path='/page-list' element={<PageListPage />} />
      <Route path='/login-log-list' element={<LoginLogListPage />} />
      <Route path='*' element={<NoPage />} />
    </PageRoutes>
  );
};

export default MainRoutes;
