import { Route } from "react-router-dom";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import Home from "pages/HomePage";
import loadable from "@loadable/component";
import Loading from "components/elements/Loading";

//const Home = loadable(() => import("pages/HomePage"));
const About = loadable(() => import("pages/About"), {
  fallback: <Loading />,
});
const Services = loadable(() => import("pages/Services"), {
  fallback: <Loading />,
});
const Contact = loadable(() => import("pages/Contact"), {
  fallback: <Loading />,
});
const Sample1 = loadable(() => import("pages/Sample1"), {
  fallback: <Loading />,
});
const Sample2 = loadable(() => import("pages/Sample2"), {
  fallback: <Loading />,
});
const Sample3 = loadable(() => import("pages/Sample3"), {
  fallback: <Loading />,
});
const Sample4 = loadable(() => import("pages/Sample4"), {
  fallback: <Loading />,
});
const Sample5 = loadable(() => import("pages/Sample5"), {
  fallback: <Loading />,
});
const Sample6 = loadable(() => import("pages/Sample6"), {
  fallback: <Loading />,
});
const NoPage = loadable(() => import("pages/NoPage"), {
  fallback: <Loading />,
});
const MyModal3 = loadable(() => import("pages/smpl/poup/MyModal3"), {
  fallback: <Loading />,
});
const GridPage = loadable(() => import("pages/GridPage"), {
  fallback: <Loading />,
});
const FormPage = loadable(() => import("pages/FormPage"), {
  fallback: <Loading />,
});
const MyModal1 = loadable(() => import("pages/smpl/poup/MyModal1"), {
  fallback: <Loading />,
});
const MyModal2 = loadable(() => import("pages/smpl/poup/MyModal2"), {
  fallback: <Loading />,
});
const Matthew = loadable(() => import("pages/smpl/poup/Matthew"), {
  fallback: <Loading />,
});
const MyModal = loadable(() => import("pages/smpl/poup/MyModal"), {
  fallback: <Loading />,
});
const MyModalGaeNullNull = loadable(() => import("pages/smpl/poup/MyModal"), {
  fallback: <Loading />,
});
const DeviceDetect = loadable(() => import("pages/DeviceDetect"), {
  fallback: <Loading />,
});
const LoginLog = loadable(() => import("pages/system/log/login-log-manage-page"), {
  fallback: <Loading />,
});

const MainRoutes = () => {
  return (
    <PageRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/services' element={<Services />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/sample1' element={<Sample1 />} />
      <Route path='/sample2' element={<Sample2 />} />
      <Route path='/sample3' element={<Sample3 />} />
      <Route path='/sample4/:id' element={<Sample4 />} />
      <Route path='/sample5/:id/:name' element={<Sample5 />} />
      <Route path='/sample6' element={<Sample6 />} />
      <Route path='/Matthew' element={<Matthew />} />
      <Route path='/MyModal' element={<MyModal />} />
      <Route path='/MyModalGaeNullNull' element={<MyModalGaeNullNull />} />
      <Route path='/MyModal1' element={<MyModal1 />} />
      <Route path='/MyModal2' element={<MyModal2 />} />
      <Route path='/MyModal3' element={<MyModal3 />} />
      <Route path='/DeviceDetect' element={<DeviceDetect />} />
      <Route path='/grid' element={<GridPage />} />
      <Route path='/form' element={<FormPage />} />
      <Route path='/loginLog' element={<LoginLog />} />
      <Route path='*' element={<NoPage />} />
    </PageRoutes>
  );
};

export default MainRoutes;
