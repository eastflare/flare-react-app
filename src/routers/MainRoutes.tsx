import Home from 'pages/HomePage';
import About from 'pages/About';
import Services from 'pages/Services';
import Contact from 'pages/Contact';
import { Route, Routes } from 'react-router-dom';
import UniversalContainer from 'components/cmn/Layout/UniversalContainer';

const MainRoutes = () => {
  return (
    <UniversalContainer>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </UniversalContainer>
  );
};

export default MainRoutes;
