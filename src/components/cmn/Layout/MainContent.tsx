import { Routes, Route } from 'react-router-dom';
import Home from 'pages/HomePage';
import About from 'pages/About';
import Services from 'pages/Services';
import Contact from 'pages/Contact';

const MainContent = () => {
  return (
    <main className='main-content'>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/about' Component={About} />
        <Route path='/services' Component={Services} />
        <Route path='/contact' Component={Contact} />
      </Routes>
    </main>
  );
};

export default MainContent;
