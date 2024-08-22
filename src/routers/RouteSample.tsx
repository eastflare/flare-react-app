//const Home = loadable(() => import("pages/HomePage"));
// const AboutPage = loadable(() => import("pages/sample/about-page"), {
//   fallback: <Loading />,

import loadable from "@loadable/component";
import Loading from "@/components/elements/Loading";
import { Route, Routes } from "react-router-dom";

const loadableOptions = { fallback: <Loading /> };
const ServicePage = loadable(() => import("pages/sample/service-page"), loadableOptions);
const ContactPage = loadable(() => import("pages/sample/contact-page"), loadableOptions);
// const Sample1Page = loadable(() => import("pages/sample/sample1-page"), {
//   fallback: <Loading />,
// });
// const Sample2Page = loadable(() => import("pages/sample/sample2-page"), {
//   fallback: <Loading />,
// });
// const Sample3Page = loadable(() => import("pages/sample/sample3-page"), {
//   fallback: <Loading />,
// });
// const Sample4Page = loadable(() => import("pages/sample/sample4-page"), {
//   fallback: <Loading />,
// });
// const Sample5Page = loadable(() => import("pages/sample/sample5-page"), {
//   fallback: <Loading />,
// });
// const Sample6Page = loadable(() => import("pages/sample/sample6-page"), {
//   fallback: <Loading />,
// });
// const NoPage = loadable(() => import("pages/sample/no-page"), {
//   fallback: <Loading />,
// });
// const MyModal3Page = loadable(() => import("pages/sample/my-modal3-page"), {
//   fallback: <Loading />,
// });
// const GridPage = loadable(() => import("pages/sample/grid-page"), {
//   fallback: <Loading />,
// });
// const FormPage = loadable(() => import("pages/sample/form-page"), {
//   fallback: <Loading />,
// });
// const MyModal1Page = loadable(() => import("pages/sample/my-modal1-page"), {
//   fallback: <Loading />,
// });
// const MyModal2Page = loadable(() => import("pages/sample/my-modal2-page"), {
//   fallback: <Loading />,
// });
// const MatthewPage = loadable(() => import("pages/sample/matthew-page"), {
//   fallback: <Loading />,
// });
// const MyModalPage = loadable(() => import("pages/sample/my-modal-page"), {
//   fallback: <Loading />,
// });
// const DeviceDetectPage = loadable(() => import("pages/sample/device-detect-page"), {
//   fallback: <Loading />,
// });
// const RouteListPage = loadable(() => import("pages/system/route/route-list-page"), {
//   fallback: <Loading />,
// });
// const PageListPage = loadable(() => import("pages/system/page/page-list-page"), {
//   fallback: <Loading />,
// });
// const LoginLogListPage = loadable(() => import("pages/system/log/login-log-list-page"), {
//   fallback: <Loading />,
// });

const RouteSample = () => {
  return (
    <>
      <Route path='/sample/service' element={<ServicePage />} />
      <Route path='/sample/contact' element={<ContactPage />} />
    </>
  );
};

export default RouteSample;
