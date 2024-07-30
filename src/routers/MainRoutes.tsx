import { Route } from "react-router-dom";
import { Env } from "config/env";
import { lazy } from "react";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import Home from "pages/HomePage";
//const Home = lazy(() => import("pages/HomePage"));
const About = lazy(() => import("pages/About"));
const Services = lazy(() => import("pages/Services"));
const Contact = lazy(() => import("pages/Contact"));
const Sample1 = lazy(() => import("pages/Sample1"));
const Sample2 = lazy(() => import("pages/Sample2"));
const Sample3 = lazy(() => import("pages/Sample3"));
const Sample4 = lazy(() => import("pages/Sample4"));
const Sample5 = lazy(() => import("pages/Sample5"));
const Sample6 = lazy(() => import("pages/Sample6"));
const NoPage = lazy(() => import("pages/NoPage"));
const MyModal3 = lazy(() => import("pages/smpl/poup/MyModal3"));
const GridPage = lazy(() => import("pages/GridPage"));
const MyModal1 = lazy(() => import("pages/smpl/poup/MyModal1"));
const MyModal2 = lazy(() => import("pages/smpl/poup/MyModal2"));
const Matthew = lazy(() => import("pages/smpl/poup/Matthew"));
const MyModal = lazy(() => import("pages/smpl/poup/MyModal"));

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
      <Route path='/MyModal1' element={<MyModal1 />} />
      <Route path='/MyModal2' element={<MyModal2 />} />
      <Route path='/MyModal3' element={<MyModal3 />} />
      <Route path='/grid' element={<GridPage />} />
      <Route path='*' element={<NoPage />} />
    </PageRoutes>
  );
};

export default MainRoutes;
