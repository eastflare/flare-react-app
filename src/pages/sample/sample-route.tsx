import { RouteObject } from "react-router-dom";
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

const SampleRoute: RouteObject[] = [
  { path: "/sample/about", element: <AboutPage /> },
  { path: "/sample/service", element: <ServicePage /> },
  { path: "/sample/contact", element: <ContactPage /> },
  { path: "/sample/sample1", element: <Sample1Page /> },
  { path: "/sample/sample2", element: <Sample2Page /> },
  { path: "/sample/sample3", element: <Sample3Page /> },
  { path: "/sample/sample4/:id", element: <Sample4Page /> },
  { path: "/sample/sample5/:id/:name", element: <Sample5Page /> },
  { path: "/sample/sample6", element: <Sample6Page /> },
  { path: "/sample/matthew", element: <MatthewPage /> },
  { path: "/sample/my-modal", element: <MyModalPage /> },
  { path: "/sample/my-modal1", element: <MyModal1Page /> },
  { path: "/sample/my-modal2", element: <MyModal2Page /> },
  { path: "/sample/my-modal3", element: <MyModal3Page /> },
  { path: "/sample/device-detect", element: <DeviceDetectPage /> },
  { path: "/sample/grid", element: <GridPage /> },
  { path: "/sample/form", element: <FormPage /> },
];

export default SampleRoute;
