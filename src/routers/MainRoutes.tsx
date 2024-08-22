import { Route, Routes } from "react-router-dom";
import PageRoutes from "@/components/layout/PageRoutes";
import Home from "pages/home-page";
import NoPage from "pages/sample/no-page";
import Loading from "@/components/elements/Loading";
import loadable from "@loadable/component";

const loadableOptions = { fallback: <Loading /> };
const ServicePage = loadable(() => import("pages/sample/service-page"), loadableOptions);
const ContactPage = loadable(() => import("pages/sample/contact-page"), loadableOptions);
const AboutPage = loadable(() => import("pages/sample/about-page"), loadableOptions);
const Sample1Page = loadable(() => import("pages/sample/sample1-page"), loadableOptions);
const Sample2Page = loadable(() => import("pages/sample/sample2-page"), loadableOptions);
const Sample3Page = loadable(() => import("pages/sample/sample3-page"), loadableOptions);
const Sample4Page = loadable(() => import("pages/sample/sample4-page"), loadableOptions);
const Sample5Page = loadable(() => import("pages/sample/sample5-page"), loadableOptions);
const Sample6Page = loadable(() => import("pages/sample/sample6-page"), loadableOptions);
const MyModal3Page = loadable(() => import("pages/sample/my-modal3-page"), loadableOptions);
const GridPage = loadable(() => import("pages/sample/grid-page"), loadableOptions);
const FormPage = loadable(() => import("pages/sample/form-page"), loadableOptions);
const MyModal1Page = loadable(() => import("pages/sample/my-modal1-page"), loadableOptions);
const MyModal2Page = loadable(() => import("pages/sample/my-modal2-page"), loadableOptions);
const MatthewPage = loadable(() => import("pages/sample/matthew-page"), loadableOptions);
const MyModalPage = loadable(() => import("pages/sample/my-modal-page"), loadableOptions);
const DeviceDetectPage = loadable(() => import("pages/sample/device-detect-page"), loadableOptions);
const RouteListPage = loadable(() => import("pages/system/route/route-list-page"), loadableOptions);
const PageListPage = loadable(() => import("pages/system/page/page-list-page"), loadableOptions);
const LoginLogListPage = loadable(() => import("pages/system/log/login-log-list-page"), loadableOptions);

const MainRoutes = () => {
  return (
    <PageRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/sample/about' element={<AboutPage />} />
      <Route path='/sample/service' element={<ServicePage />} />
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
