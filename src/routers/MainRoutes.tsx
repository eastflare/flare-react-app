import Home from "pages/HomePage";
import About from "pages/About";
import Services from "pages/Services";
import Contact from "pages/Contact";
import { Route, useNavigate } from "react-router-dom";
import MainContainer from "components/cmn/Layout/MainContainer";
import Sample1 from "pages/Sample1";
import Sample2 from "pages/Sample2";
import Sample3 from "pages/Sample3";
import PageRoutes from "components/cmn/Layout/PageRoutes";
import { PageRouterProvider } from "contexts/cmn/PageRouterContext";
import usePageTab from "hooks/cmn/usePageTab";

const MainRoutes = () => {
  const navigate = useNavigate();
  const { getPageRouterProviderProps } = usePageTab({ navigate });

  return (
    <PageRouterProvider value={{ ...getPageRouterProviderProps() }}>
      <MainContainer>
        <PageRoutes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sample1' element={<Sample1 />} />
          <Route path='/sample2' element={<Sample2 />} />
          <Route path='/sample3' element={<Sample3 />} />
        </PageRoutes>
      </MainContainer>
    </PageRouterProvider>
  );
};

export default MainRoutes;
