import Home from "pages/HomePage";
import About from "pages/About";
import Services from "pages/Services";
import Contact from "pages/Contact";
import { Route } from "react-router-dom";
import Sample1 from "pages/Sample1";
import Sample2 from "pages/Sample2";
import Sample3 from "pages/Sample3";
import PageMdiRoutes from "components/cmn/Layout/PageMdiRoutes";
import Sample4 from "pages/Sample4";
import Sample5 from "pages/Sample5";
import Sample6 from "pages/Sample6";
import NoPage from "pages/NoPage";
import MyModal3 from "pages/smpl/poup/MyModal3";
import GridPage from "pages/GridPage";
import MyModal1 from "pages/smpl/poup/MyModal1";
import MyModal2 from "pages/smpl/poup/MyModal2";
import Matthew from "pages/smpl/poup/Matthew";
import MyModal from "pages/smpl/poup/MyModal";

interface MainRoutesProps {
  isMdi: boolean;
}

const MainRoutes = (props: MainRoutesProps) => {
  const { isMdi } = props;
  const RoutesComponent = isMdi ? PageMdiRoutes : PageMdiRoutes;
  return (
    <RoutesComponent>
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
    </RoutesComponent>
  );
};

export default MainRoutes;
