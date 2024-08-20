import { Route } from "react-router-dom";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import Home from "pages/home-page";
import loadable from "@loadable/component";
import Loading from "components/elements/Loading";

//const Home = loadable(() => import("pages/HomePage"));
const AboutPage = loadable(() => import("pages/sample/about-page"), {
  fallback: <Loading />,
});
const ServicesPage = loadable(() => import("pages/sample/service-page"), {
  fallback: <Loading />,
});
const ContactPage = loadable(() => import("pages/sample/contact-page"), {
  fallback: <Loading />,
});
const Sample1Page = loadable(() => import("pages/sample/sample1-page"), {
  fallback: <Loading />,
});
const Sample2Page = loadable(() => import("pages/sample/sample2-page"), {
  fallback: <Loading />,
});
const Sample3Page = loadable(() => import("pages/sample/sample3-page"), {
  fallback: <Loading />,
});
const Sample4Page = loadable(() => import("pages/sample/sample4-page"), {
  fallback: <Loading />,
});
const Sample5Page = loadable(() => import("pages/sample/sample5-page"), {
  fallback: <Loading />,
});
const Sample6Page = loadable(() => import("pages/sample/sample6-page"), {
  fallback: <Loading />,
});
const NoPage = loadable(() => import("pages/sample/no-page"), {
  fallback: <Loading />,
});
const MyModal3Page = loadable(() => import("pages/sample/my-modal3-page"), {
  fallback: <Loading />,
});
const GridPage = loadable(() => import("pages/sample/grid-page"), {
  fallback: <Loading />,
});
const FormPage = loadable(() => import("pages/sample/form-page"), {
  fallback: <Loading />,
});
const MyModal1Page = loadable(() => import("pages/sample/my-modal1-page"), {
  fallback: <Loading />,
});
const MyModal2Page = loadable(() => import("pages/sample/my-modal2-page"), {
  fallback: <Loading />,
});
const MatthewPage = loadable(() => import("pages/sample/matthew-page"), {
  fallback: <Loading />,
});
const MyModalPage = loadable(() => import("pages/sample/my-modal-page"), {
  fallback: <Loading />,
});
const DeviceDetectPage = loadable(() => import("pages/sample/device-detect-page"), {
  fallback: <Loading />,
});
const RouteListPage = loadable(() => import("pages/system/route/route-list-page"), {
  fallback: <Loading />,
});
const PageListPage = loadable(() => import("pages/system/page/page-list-page"), {
  fallback: <Loading />,
});
const LoginLogListPage = loadable(() => import("pages/system/log/login-log-list-page"), {
  fallback: <Loading />,
});

const MainRoutes = () => {
  return (
    <PageRoutes>
      {/* 수동 Route 처리하는 부분 */}
      <Route path='/' element={<Home />} />
      {/* 자동 Route 처리하는 부분 */}
      <Route path='/sample/about' element={<AboutPage />} />
      <Route path='/sample/service' element={<ServicesPage />} />
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
      <Route path='/system/route/route-list' element={<RouteListPage />} />
      <Route path='/system/page/page-list' element={<PageListPage />} />
      <Route path='/system/log/login-log-list' element={<LoginLogListPage />} />
      <Route path='*' element={<NoPage />} />
    </PageRoutes>
  );
};

export default MainRoutes;
