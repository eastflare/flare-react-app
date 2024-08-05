import { Route } from "react-router-dom";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import Home from "pages/HomePage";
import loadable from "@loadable/component";

//const Home = loadable(() => import("pages/HomePage"));
const About = loadable(() => import("pages/About"));
const Services = loadable(() => import("pages/Services"));
const Contact = loadable(() => import("pages/Contact"));
const Sample1 = loadable(() => import("pages/Sample1"));
const Sample2 = loadable(() => import("pages/Sample2"));
const Sample3 = loadable(() => import("pages/Sample3"));
const Sample4 = loadable(() => import("pages/Sample4"));
const Sample5 = loadable(() => import("pages/Sample5"));
const Sample6 = loadable(() => import("pages/Sample6"));
const NoPage = loadable(() => import("pages/NoPage"));
const MyModal3 = loadable(() => import("pages/smpl/poup/MyModal3"));
const GridPage = loadable(() => import("pages/GridPage"));
const FormPage = loadable(() => import("pages/FormPage"));
const MyModal1 = loadable(() => import("pages/smpl/poup/MyModal1"));
const MyModal2 = loadable(() => import("pages/smpl/poup/MyModal2"));
const Matthew = loadable(() => import("pages/smpl/poup/Matthew"));
const MyModal = loadable(() => import("pages/smpl/poup/MyModal"));
const MyModalGaeNullNull = loadable(() => import("pages/smpl/poup/MyModal"));
const DeviceDetect = loadable(() => import("pages/DeviceDetect"));

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
      <Route path='*' element={<NoPage />} />
    </PageRoutes>
  );
};

export default MainRoutes;
